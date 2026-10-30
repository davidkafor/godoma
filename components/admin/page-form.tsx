'use client'

import { useActionState, useId, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowUp, Eye, Loader2, Plus, Trash2 } from 'lucide-react'
import { savePage } from '@/lib/admin/page-actions'
import type { FormState } from '@/lib/admin/crud'
import { Notice } from './page-header'
import { MediaField } from './media-field'
import { btnGhost, btnPrimary, btnSecondary, inputClass, labelClass } from './styles'

type Section = { key: number; heading: string; body: string }

type Props = {
  slug: string
  values: { title: string; eyebrow: string; intro: string }
  sections: { heading: string; body: string }[]
  status: 'DRAFT' | 'PUBLISHED'
  publishedAt: string
  canPublish: boolean
  media: { heroImage: string; videoUrl: string; inMenu: boolean }
}

export function PageForm({ slug, values, sections: initial, status, publishedAt, canPublish, media }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePage.bind(null, slug), {})
  const [sections, setSections] = useState<Section[]>(() => initial.map((s, key) => ({ key, ...s })))
  const [nextKey, setNextKey] = useState(initial.length)
  const ids = { video: useId(), title: useId(), eyebrow: useId(), intro: useId(), status: useId(), date: useId() }
  const err = state.fieldErrors ?? {}

  const move = (index: number, delta: number) =>
    setSections((list) => {
      const target = index + delta
      if (target < 0 || target >= list.length) return list
      const copy = [...list]
      ;[copy[index], copy[target]] = [copy[target], copy[index]]
      return copy
    })
  const update = (key: number, patch: Partial<Section>) => setSections((list) => list.map((s) => (s.key === key ? { ...s, ...patch } : s)))

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]" noValidate>
      <div className="min-w-0 space-y-5">
        <div className="space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
          {state.error && <Notice tone="error">{state.error}</Notice>}
          {state.ok && state.message && <Notice>{state.message}</Notice>}
          {(
            [
              ['title', 'Page title', ids.title],
              ['eyebrow', 'Small heading above the title', ids.eyebrow],
            ] as const
          ).map(([name, label, id]) => (
            <div key={name}>
              <label htmlFor={id} className={labelClass}>
                {label} <span className="text-destructive">*</span>
              </label>
              <input id={id} name={name} defaultValue={values[name]} className={inputClass} maxLength={255} aria-invalid={err[name] ? true : undefined} />
              {err[name] && (
                <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
                  {err[name]}
                </p>
              )}
            </div>
          ))}
          <div>
            <label htmlFor={ids.intro} className={labelClass}>
              Introduction <span className="text-destructive">*</span>
            </label>
            <textarea id={ids.intro} name="intro" rows={4} defaultValue={values.intro} maxLength={5000} className={inputClass} aria-invalid={err.intro ? true : undefined} />
            {err.intro && (
              <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
                {err.intro}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
          <h2 className="text-lg font-extrabold text-primary">Image and video</h2>
          <MediaField name="heroImage" label="Page image (optional)" kind="IMAGE" defaultValue={media.heroImage} help="Shown under the page title. Upload a file or choose one from the media library." error={err.heroImage} />
          <div>
            <label htmlFor={ids.video} className={labelClass}>
              Video link (optional)
            </label>
            <input id={ids.video} name="videoUrl" type="url" defaultValue={media.videoUrl} placeholder="https://www.youtube.com/watch?v=…" maxLength={500} className={inputClass} aria-invalid={err.videoUrl ? true : undefined} />
            <p className="mt-1 text-xs text-muted-foreground">YouTube, Vimeo, or a direct https link to an .mp4 or .webm file.</p>
            {err.videoUrl && (
              <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
                {err.videoUrl}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-primary">Sections</h2>
            <button
              type="button"
              className={btnSecondary}
              onClick={() => {
                setSections((l) => [...l, { key: nextKey, heading: '', body: '' }])
                setNextKey((k) => k + 1)
              }}
            >
              <Plus className="size-4" aria-hidden="true" />
              Add section
            </button>
          </div>
          {err.sections && <Notice tone="error">{err.sections}</Notice>}
          {sections.length === 0 && <p className="text-sm text-muted-foreground">This page has no sections yet.</p>}
          <ol className="space-y-4">
            {sections.map((section, index) => (
              <li key={section.key} className="rounded-md border border-border bg-background p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Section {index + 1}</span>
                  <div className="flex gap-1">
                    <button type="button" className={btnGhost} onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move section ${index + 1} up`}>
                      <ArrowUp className="size-4" aria-hidden="true" />
                    </button>
                    <button type="button" className={btnGhost} onClick={() => move(index, 1)} disabled={index === sections.length - 1} aria-label={`Move section ${index + 1} down`}>
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </button>
                    <button type="button" className={`${btnGhost} text-destructive`} onClick={() => setSections((l) => l.filter((s) => s.key !== section.key))} aria-label={`Remove section ${index + 1}`}>
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <label className="sr-only" htmlFor={`h-${section.key}`}>
                  Heading for section {index + 1}
                </label>
                <input id={`h-${section.key}`} name="sectionHeading" value={section.heading} onChange={(e) => update(section.key, { heading: e.target.value })} placeholder="Heading" maxLength={255} className={`${inputClass} mb-2 font-semibold`} />
                <label className="sr-only" htmlFor={`b-${section.key}`}>
                  Text for section {index + 1}
                </label>
                <textarea id={`b-${section.key}`} name="sectionBody" value={section.body} onChange={(e) => update(section.key, { body: e.target.value })} rows={Math.min(14, Math.max(4, Math.ceil(section.body.length / 90)))} placeholder="Text. Separate paragraphs with a blank line." className={inputClass} />
              </li>
            ))}
          </ol>
        </div>
      </div>

      <aside className="h-fit space-y-4 rounded-lg border border-border bg-card p-4 lg:sticky lg:top-20">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-primary">Publishing</h2>
        <div>
          <label htmlFor={ids.status} className={labelClass}>
            Status
          </label>
          <select id={ids.status} name="status" defaultValue={status} className={inputClass} disabled={!canPublish}>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft (page returns “not found”)</option>
          </select>
          {!canPublish && <input type="hidden" name="status" value={status} />}
        </div>
        <div>
          <label htmlFor={ids.date} className={labelClass}>
            Publication date (EAT)
          </label>
          <input id={ids.date} name="publishedAt" type="datetime-local" defaultValue={publishedAt} className={inputClass} />
          {err.publishedAt && (
            <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
              {err.publishedAt}
            </p>
          )}
        </div>
        <label className="flex items-start gap-2 text-sm font-semibold">
          <input type="checkbox" name="inMenu" defaultChecked={media.inMenu} className="mt-1 size-4 accent-primary" />
          <span>
            Show in the website menu
            <span className="block text-xs font-normal text-muted-foreground">Adds this page under “More” in the main navigation.</span>
          </span>
        </label>
        <div className="flex flex-col gap-2">
          <button type="submit" disabled={pending} className={btnPrimary}>
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {pending ? 'Saving…' : 'Save changes'}
          </button>
          <Link href={`/admin/preview/pages/${slug}`} target="_blank" className={btnSecondary}>
            <Eye className="size-4" aria-hidden="true" />
            Preview
          </Link>
          <Link href="/admin/pages" className={btnSecondary}>
            Back to pages
          </Link>
        </div>
      </aside>
    </form>
  )
}
