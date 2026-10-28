'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { audit } from '@/lib/audit'
import { resourceByKey, type Field, type Resource } from './resources'
import { cleanText, isSafeLink, slugify, slugPattern } from './validation'
import { fromInputValue } from './dates'

export type FormState = {
  ok?: boolean
  error?: string
  message?: string
  fieldErrors?: Record<string, string>
}

type Delegate = {
  findUnique: (args: unknown) => Promise<Record<string, unknown> | null>
  findFirst: (args: unknown) => Promise<Record<string, unknown> | null>
  create: (args: unknown) => Promise<{ id: string }>
  update: (args: unknown) => Promise<{ id: string }>
  delete: (args: unknown) => Promise<unknown>
}

const delegateFor = (resource: Resource) => (prisma as unknown as Record<string, Delegate>)[resource.model]

function refreshPublicSite() {
  revalidatePath('/', 'layout')
}

function describeError(error: unknown): string {
  if (error instanceof AuthorizationError) return error.message
  const code = (error as { code?: string })?.code
  if (code === 'P2002') return 'Another item already uses the same unique value (for example the same web address or name).'
  if (code === 'P2025') return 'That item no longer exists. Refresh the page and try again.'
  console.error('[admin] unexpected error', error)
  return 'Something went wrong while saving. Please try again.'
}

async function parseFields(resource: Resource, formData: FormData) {
  const data: Record<string, unknown> = {}
  const fieldErrors: Record<string, string> = {}

  for (const field of resource.fields) {
    const raw = formData.get(field.name)
    const text = typeof raw === 'string' ? cleanText(raw) : ''
    const fail = (message: string) => {
      fieldErrors[field.name] = message
    }

    if (field.type === 'boolean') {
      data[field.name] = raw === 'on' || raw === 'true'
      continue
    }
    if (field.type === 'number') {
      const n = text === '' ? 0 : Number(text)
      if (!Number.isInteger(n) || n < -9999 || n > 9999) fail('Enter a whole number between -9999 and 9999.')
      else data[field.name] = n
      continue
    }
    if (!text) {
      if (field.required && !field.autoSlugFrom) fail(`${field.label} is required.`)
      else data[field.name] = field.autoSlugFrom ? '' : null
      continue
    }
    if (field.max && text.length > field.max) {
      fail(`${field.label} must be ${field.max} characters or fewer.`)
      continue
    }
    if (field.type === 'select') {
      let allowed = field.options?.map((o) => o.value) ?? []
      if (field.optionsFrom === 'departments') {
        allowed = (await prisma.department.findMany({ select: { id: true } })).map((d) => d.id)
      }
      if (!allowed.includes(text)) fail(`Choose a valid ${field.label.toLowerCase()}.`)
      else data[field.name] = text
      continue
    }
    if (field.type === 'image' || field.type === 'file' || field.name === 'href') {
      if (!isSafeLink(text)) fail(`${field.label} must be an uploaded file, a site path starting with /, or an http(s) link.`)
      else data[field.name] = text
      continue
    }
    data[field.name] = text
  }
  return { data, fieldErrors }
}

async function resolveSlug(resource: Resource, data: Record<string, unknown>, field: Field, id: string | null, fieldErrors: Record<string, string>) {
  const source = String(data[field.autoSlugFrom!] ?? '')
  const typed = String(data[field.name] ?? '')
  let slug = typed ? slugify(typed) : slugify(source)
  if (!slug || !slugPattern.test(slug)) {
    fieldErrors[field.name] = 'Could not build a valid web address. Use letters, numbers and hyphens.'
    return
  }
  // Auto-generated slugs get a numeric suffix on collision; typed slugs must be unique as typed.
  const base = slug
  for (let i = 2; i < 50; i += 1) {
    const clash = await delegateFor(resource).findFirst({ where: { [field.name]: slug, ...(id ? { NOT: { id } } : {}) }, select: { id: true } })
    if (!clash) break
    if (typed) {
      fieldErrors[field.name] = 'That web address is already in use.'
      return
    }
    slug = `${base}-${i}`
  }
  data[field.name] = slug
}

export async function saveItem(resourceKey: string, id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  let createdId: string | null = null
  try {
    const resource = resourceByKey[resourceKey]
    if (!resource) return { error: 'Unknown content type.' }
    const session = await assertPermission('content:write')

    const { data, fieldErrors } = await parseFields(resource, formData)
    for (const field of resource.fields) {
      if (field.autoSlugFrom && !fieldErrors[field.autoSlugFrom]) await resolveSlug(resource, data, field, id, fieldErrors)
    }

    const status = formData.get('status') === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'
    if (status === 'PUBLISHED') await assertPermission('content:publish')
    const requestedDate = String(formData.get('publishedAt') ?? '')
    const publishedAt = fromInputValue(requestedDate)
    if (requestedDate && !publishedAt) fieldErrors.publishedAt = 'Enter a valid publication date and time.'

    if (Object.keys(fieldErrors).length) return { error: 'Please correct the highlighted fields.', fieldErrors }

    const delegate = delegateFor(resource)
    const existing = id ? await delegate.findUnique({ where: { id }, select: { publishedAt: true } }) : null
    if (id && !existing) return { error: 'That item no longer exists.' }

    const effectiveDate = publishedAt ?? (existing?.publishedAt as Date | null | undefined) ?? (status === 'PUBLISHED' ? new Date() : null)
    const payload = { ...data, status, publishedAt: effectiveDate }

    if (id) {
      await delegate.update({ where: { id }, data: payload })
      await audit(session.user.id, 'update', resource.key, id, String(data[resource.titleField] ?? ''))
    } else {
      const created = await delegate.create({ data: payload })
      createdId = created.id
      await audit(session.user.id, 'create', resource.key, created.id, String(data[resource.titleField] ?? ''))
    }
    refreshPublicSite()
    if (!createdId) return { ok: true, message: status === 'PUBLISHED' ? 'Saved and live on the website.' : 'Saved as a draft.' }
  } catch (error) {
    return { error: describeError(error) }
  }
  redirect(`/admin/${resourceKey}?notice=created`)
}

export async function deleteItem(resourceKey: string, id: string): Promise<FormState> {
  try {
    const resource = resourceByKey[resourceKey]
    if (!resource) return { error: 'Unknown content type.' }
    const session = await assertPermission('content:delete')
    const delegate = delegateFor(resource)
    const existing = await delegate.findUnique({ where: { id } })
    if (!existing) return { error: 'That item no longer exists.' }
    await delegate.delete({ where: { id } })
    await audit(session.user.id, 'delete', resource.key, id, String(existing[resource.titleField] ?? ''))
    refreshPublicSite()
    return { ok: true, message: 'Deleted.' }
  } catch (error) {
    return { error: describeError(error) }
  }
}

export async function setItemStatus(resourceKey: string, id: string, status: 'DRAFT' | 'PUBLISHED'): Promise<FormState> {
  try {
    const resource = resourceByKey[resourceKey]
    if (!resource) return { error: 'Unknown content type.' }
    const session = await assertPermission('content:publish')
    const delegate = delegateFor(resource)
    const existing = await delegate.findUnique({ where: { id }, select: { publishedAt: true } })
    if (!existing) return { error: 'That item no longer exists.' }
    await delegate.update({
      where: { id },
      data: { status, ...(status === 'PUBLISHED' && !existing.publishedAt ? { publishedAt: new Date() } : {}) },
    })
    await audit(session.user.id, status === 'PUBLISHED' ? 'publish' : 'unpublish', resource.key, id)
    refreshPublicSite()
    return { ok: true, message: status === 'PUBLISHED' ? 'Published.' : 'Moved back to draft.' }
  } catch (error) {
    return { error: describeError(error) }
  }
}
