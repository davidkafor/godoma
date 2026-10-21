'use client'

import { useEffect, useState } from 'react'

const CONSENT_COOKIE = 'godoma_cookie_consent'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hasConsent = document.cookie.split('; ').some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
    if (!hasConsent) setVisible(true)
  }, [])

  function saveConsent(value: 'accepted' | 'declined') {
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-xl border border-border bg-card p-5 text-card-foreground shadow-2xl sm:inset-x-6 sm:flex sm:items-center sm:gap-6 sm:p-6"
    >
      <div className="min-w-0 flex-1">
        <h2 id="cookie-consent-title" className="text-lg font-bold text-primary">Cookies on this website</h2>
        <p id="cookie-consent-description" className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We use essential cookies to remember your preferences and help this website work properly. You can accept or decline non-essential cookies.
        </p>
      </div>
      <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
        <button type="button" onClick={() => saveConsent('declined')} className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Decline
        </button>
        <button type="button" onClick={() => saveConsent('accepted')} className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Accept cookies
        </button>
      </div>
    </aside>
  )
}
