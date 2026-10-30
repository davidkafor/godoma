'use client'

import { useActionState, useState } from 'react'
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from 'lucide-react'
import { saveHome } from '@/lib/admin/home-actions'
import type { FormState } from '@/lib/admin/crud'
import { homeSectionLabels, type HomeContent } from '@/lib/home-defaults'
import { Notice } from './page-header'
import { MediaField } from './media-field'
import { btnGhost, btnPrimary, btnSecondary, inputClass, labelClass } from './styles'

type Errors = Record<string, string>

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
      <legend className="sr-only">{title}</legend>
      <div>
        <h2 className="text-lg font-extrabold text-primary">{title}</h2>
        {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </fieldset>
  )
}

function Text({ name, label, value, err, help, area, rows = 3 }: { name: string; label: string; value: string; err: Errors; help?: string; area?: boolean; rows?: number }) {
  const id = `f-${name}`
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {area ? (
        <textarea id={id} name={name} rows={rows} defaultValue={value} className={inputClass} aria-invalid={err[name] ? true : undefined} />
      ) : (
        <input id={id} name={name} defaultValue={value} className={inputClass} aria-invalid={err[name] ? true : undefined} />
      )}
      {help && <p className="mt-1 text-xs text-muted-foreground">{help}</p>}
      {err[name] && (
        <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
          {err[name]}
        </p>
      )}
    </div>
  )
}

export function HomeForm({ home }: { home: HomeContent }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveHome, {})
  const [layout, setLayout] = useState(home.layout)
  const [stats, setStats] = useState(() => home.stats.map((s, key) => ({ key, ...s })))
  const [nextKey, setNextKey] = useState(home.stats.length)
  const err = state.fieldErrors ?? {}
  const { principal: p, video: v, about: a, admissions: ad } = home

  const move = (index: number, delta: number) =>
    setLayout((list) => {
      const target = index + delta
      if (target < 0 || target >= list.length) return list
      const copy = [...list]
      ;[copy[index], copy[target]] = [copy[target], copy[index]]
      return copy
    })

  return (
    <form action={action} noValidate className="space-y-6">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      {state.ok && state.message && <Notice>{state.message}</Notice>}

      <Card title="Section order and visibility" hint="Move sections up or down and untick any section you want to hide from the homepage. The slider and news ticker stay at the top and are edited under Hero slides and News.">
        <ul className="divide-y divide-border rounded-md border border-border">
          {layout.map((section, index) => (
            <li key={section.key} className="flex items-center gap-3 px-3 py-2">
              <input type="hidden" name="layoutKey" value={section.key} />
              <label className="flex flex-1 items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={section.visible}
                  onChange={(e) => setLayout((l) => l.map((s) => (s.key === section.key ? { ...s, visible: e.target.checked } : s)))}
                  className="size-4 accent-primary"
                />
                {homeSectionLabels[section.key]}
              </label>
              {!section.visible && <input type="hidden" name="layoutHidden" value={section.key} />}
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className={btnGhost} aria-label={`Move ${homeSectionLabels[section.key]} up`}>
                <ArrowUp className="size-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === layout.length - 1} className={btnGhost} aria-label={`Move ${homeSectionLabels[section.key]} down`}>
                <ArrowDown className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Message from the principal">
        <MediaField name="principal.photo" label="Photo" kind="IMAGE" defaultValue={p.photo} error={err['principal.photo']} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="principal.name" label="Name" value={p.name} err={err} />
          <Text name="principal.role" label="Role" value={p.role} err={err} />
          <Text name="principal.eyebrow" label="Small heading" value={p.eyebrow} err={err} />
          <Text name="principal.heading" label="Heading" value={p.heading} err={err} />
        </div>
        <Text name="principal.paragraphs" label="Message" value={p.paragraphs.join('\n\n')} err={err} area rows={10} help="Leave a blank line between paragraphs." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="principal.linkLabel" label="Link text" value={p.linkLabel} err={err} />
          <Text name="principal.linkHref" label="Link address" value={p.linkHref} err={err} help="For example /about" />
        </div>
      </Card>

      <Card title="Introduction video" hint="The video shown beside the latest news.">
        <Text name="video.url" label="Video link" value={v.url} err={err} help="YouTube, Vimeo, or a direct https link to an .mp4 or .webm file. Leave blank to hide the video player." />
        <MediaField name="video.poster" label="Cover image (optional)" kind="IMAGE" defaultValue={v.poster} help="Shown before a direct video file is played." error={err['video.poster']} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="video.eyebrow" label="Small heading" value={v.eyebrow} err={err} />
          <Text name="video.heading" label="Heading" value={v.heading} err={err} />
          <Text name="video.badge" label="Badge" value={v.badge} err={err} />
          <Text name="video.linkLabel" label="Link text" value={v.linkLabel} err={err} />
          <Text name="video.linkHref" label="Link address" value={v.linkHref} err={err} />
        </div>
        <Text name="video.description" label="Caption" value={v.description} err={err} area />
      </Card>

      <Card title="About, vision, mission and values">
        <MediaField name="about.image" label="Campus image" kind="IMAGE" defaultValue={a.image} error={err['about.image']} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="about.badgeValue" label="Badge number" value={a.badgeValue} err={err} />
          <Text name="about.badgeText" label="Badge text" value={a.badgeText} err={err} />
          <Text name="about.eyebrow" label="Small heading" value={a.eyebrow} err={err} />
          <Text name="about.heading" label="Heading" value={a.heading} err={err} />
          <Text name="about.historyTitle" label="History title" value={a.historyTitle} err={err} />
          <Text name="about.location" label="Location line" value={a.location} err={err} />
        </div>
        <Text name="about.history" label="History" value={a.history.join('\n\n')} err={err} area rows={8} help="Leave a blank line between paragraphs." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="about.visionTitle" label="Vision title" value={a.visionTitle} err={err} />
          <Text name="about.missionTitle" label="Mission title" value={a.missionTitle} err={err} />
          <Text name="about.vision" label="Vision" value={a.vision} err={err} area />
          <Text name="about.mission" label="Mission" value={a.mission} err={err} area />
          <Text name="about.valuesTitle" label="Values title" value={a.valuesTitle} err={err} />
          <Text name="about.mandateTitle" label="Mandate title" value={a.mandateTitle} err={err} />
          <Text name="about.valuesIntro" label="Values introduction" value={a.valuesIntro} err={err} area />
          <Text name="about.mandateIntro" label="Mandate introduction" value={a.mandateIntro} err={err} area />
          <Text name="about.values" label="Core values" value={a.values.join('\n')} err={err} area rows={6} help="One value per line." />
          <Text name="about.mandate" label="Mandate points" value={a.mandate.join('\n')} err={err} area rows={6} help="One point per line." />
        </div>
      </Card>

      <Card title="Numbers strip" hint="Course and department counts can follow your real data automatically, or you can type your own number.">
        <ul className="space-y-3">
          {stats.map((s) => (
            <li key={s.key} className="grid gap-2 sm:grid-cols-[1fr_12rem_8rem_auto] sm:items-end">
              <div>
                <label className={labelClass}>Label</label>
                <input name="statLabel" defaultValue={s.label} maxLength={80} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Number comes from</label>
                <select name="statSource" defaultValue={s.source} className={inputClass}>
                  <option value="courses">Total courses (automatic)</option>
                  <option value="departments">Total departments (automatic)</option>
                  <option value="custom">A number I type</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Number</label>
                <input name="statValue" type="number" min={0} defaultValue={s.value} className={inputClass} />
              </div>
              <button type="button" onClick={() => setStats((l) => l.filter((x) => x.key !== s.key))} className={btnGhost} aria-label={`Remove ${s.label}`}>
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        {stats.length < 8 && (
          <button
            type="button"
            onClick={() => {
              setStats((l) => [...l, { key: nextKey, label: '', source: 'custom', value: 0 }])
              setNextKey((n) => n + 1)
            }}
            className={btnSecondary}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add a number
          </button>
        )}
      </Card>

      <Card title="Admissions" hint="Entry requirement rows come from your courses. Edit those under Departments and courses.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="admissions.eyebrow" label="Small heading" value={ad.eyebrow} err={err} />
          <Text name="admissions.heading" label="Heading" value={ad.heading} err={err} />
          <Text name="admissions.helbTitle" label="Funding title" value={ad.helbTitle} err={err} />
          <Text name="admissions.helbText" label="Funding text" value={ad.helbText} err={err} />
          <Text name="admissions.applyLabel" label="Apply button text" value={ad.applyLabel} err={err} />
          <Text name="admissions.portalLabel" label="Portal button text" value={ad.portalLabel} err={err} />
          <Text name="admissions.tableTitle" label="Requirements card title" value={ad.tableTitle} err={err} />
          <Text name="admissions.tableNote" label="Requirements card note" value={ad.tableNote} err={err} />
        </div>
        <Text name="admissions.intro" label="Introduction" value={ad.intro} err={err} area rows={4} />
        <Text name="admissions.footnote" label="Footnote" value={ad.footnote} err={err} area />
      </Card>

      <Card title="Footer">
        <Text name="footer.tagline" label="Tagline" value={home.footer.tagline} err={err} area />
      </Card>

      <div className="sticky bottom-0 -mx-1 flex items-center gap-3 border-t border-border bg-background/95 px-1 py-3 backdrop-blur">
        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {pending ? 'Saving…' : 'Save homepage'}
        </button>
        {state.ok && state.message && <span className="text-sm font-semibold text-primary">{state.message}</span>}
      </div>
    </form>
  )
}
