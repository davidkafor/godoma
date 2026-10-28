'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { hashPassword, validatePasswordStrength, verifyPassword } from '@/lib/auth/password'
import { audit } from '@/lib/audit'
import { cleanText } from './validation'
import type { FormState } from './crud'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const roles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] as const
type Role = (typeof roles)[number]
const parseRole = (v: FormDataEntryValue | null): Role | null => (roles as readonly string[]).includes(String(v)) ? (String(v) as Role) : null

async function activeSuperAdminCount(excludingId?: string) {
  return prisma.adminUser.count({ where: { role: 'SUPER_ADMIN', active: true, ...(excludingId ? { id: { not: excludingId } } : {}) } })
}

export async function createUser(_prev: FormState, formData: FormData): Promise<FormState> {
  let createdId: string
  try {
    const session = await assertPermission('users:manage')
    const errors: Record<string, string> = {}
    const name = cleanText(String(formData.get('name') ?? ''))
    const email = cleanText(String(formData.get('email') ?? '')).toLowerCase()
    const password = String(formData.get('password') ?? '')
    const role = parseRole(formData.get('role'))
    if (!name || name.length > 191) errors.name = 'Enter a name (up to 191 characters).'
    if (!emailPattern.test(email) || email.length > 191) errors.email = 'Enter a valid email address.'
    if (!role) errors.role = 'Choose a role.'
    const weak = validatePasswordStrength(password)
    if (weak) errors.password = weak
    if (Object.keys(errors).length) return { error: 'Please correct the highlighted fields.', fieldErrors: errors }

    if (await prisma.adminUser.findUnique({ where: { email } })) return { error: 'An administrator with that email already exists.', fieldErrors: { email: 'Already in use.' } }

    const user = await prisma.adminUser.create({ data: { name, email, role: role!, passwordHash: await hashPassword(password) } })
    await audit(session.user.id, 'create', 'users', user.id, `${email} (${role})`)
    createdId = user.id
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] createUser failed', error)
    return { error: 'Something went wrong while creating the account.' }
  }
  revalidatePath('/admin/users')
  redirect(`/admin/users?notice=created&id=${createdId}`)
}

export async function updateUser(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await assertPermission('users:manage')
    const target = await prisma.adminUser.findUnique({ where: { id } })
    if (!target) return { error: 'That account no longer exists.' }

    const errors: Record<string, string> = {}
    const name = cleanText(String(formData.get('name') ?? ''))
    const role = parseRole(formData.get('role'))
    const active = formData.get('active') === 'on'
    const password = String(formData.get('password') ?? '')
    if (!name || name.length > 191) errors.name = 'Enter a name (up to 191 characters).'
    if (!role) errors.role = 'Choose a role.'
    if (password) {
      const weak = validatePasswordStrength(password)
      if (weak) errors.password = weak
    }
    if (Object.keys(errors).length) return { error: 'Please correct the highlighted fields.', fieldErrors: errors }

    if (id === session.user.id && (!active || role !== target.role)) {
      return { error: 'You cannot change your own role or deactivate your own account.' }
    }
    if (target.role === 'SUPER_ADMIN' && (role !== 'SUPER_ADMIN' || !active) && (await activeSuperAdminCount(id)) === 0) {
      return { error: 'At least one active super administrator must remain.' }
    }

    await prisma.adminUser.update({
      where: { id },
      data: { name, role: role!, active, ...(password ? { passwordHash: await hashPassword(password) } : {}) },
    })
    if (!active || password || role !== target.role) await prisma.session.deleteMany({ where: { userId: id } })
    await audit(session.user.id, 'update', 'users', id, `${target.email}${password ? ' (password reset)' : ''}`)
    revalidatePath('/admin/users')
    return { ok: true, message: 'Account updated.' + (password || !active ? ' Their existing sessions were signed out.' : '') }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] updateUser failed', error)
    return { error: 'Something went wrong while saving.' }
  }
}

export async function deleteUser(id: string): Promise<FormState> {
  try {
    const session = await assertPermission('users:manage')
    if (id === session.user.id) return { error: 'You cannot delete your own account.' }
    const target = await prisma.adminUser.findUnique({ where: { id } })
    if (!target) return { error: 'That account no longer exists.' }
    if (target.role === 'SUPER_ADMIN' && target.active && (await activeSuperAdminCount(id)) === 0) {
      return { error: 'At least one active super administrator must remain.' }
    }
    await prisma.adminUser.delete({ where: { id } })
    await audit(session.user.id, 'delete', 'users', id, target.email)
    revalidatePath('/admin/users')
    return { ok: true }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] deleteUser failed', error)
    return { error: 'Something went wrong while deleting.' }
  }
}

export async function changeOwnPassword(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await assertPermission()
    const current = String(formData.get('current') ?? '')
    const next = String(formData.get('next') ?? '')
    const confirm = String(formData.get('confirm') ?? '')
    const errors: Record<string, string> = {}
    if (!current) errors.current = 'Enter your current password.'
    const weak = validatePasswordStrength(next)
    if (weak) errors.next = weak
    if (next !== confirm) errors.confirm = 'The passwords do not match.'
    if (Object.keys(errors).length) return { error: 'Please correct the highlighted fields.', fieldErrors: errors }

    const user = await prisma.adminUser.findUnique({ where: { id: session.user.id } })
    if (!user || !(await verifyPassword(current, user.passwordHash))) {
      return { error: 'Your current password is incorrect.', fieldErrors: { current: 'Incorrect password.' } }
    }
    await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(next) } })
    await prisma.session.deleteMany({ where: { userId: user.id, id: { not: session.sessionId } } })
    await audit(user.id, 'update', 'users', user.id, 'Password changed')
    return { ok: true, message: 'Password changed. Other devices were signed out.' }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] changeOwnPassword failed', error)
    return { error: 'Something went wrong while changing the password.' }
  }
}
