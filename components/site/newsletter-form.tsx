'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NewsletterForm({ email: contactEmail }: { email: string }) {
  const contact = { email: contactEmail }
  const [email, setEmail] = useState('')

  return (
    <form
      className="mt-5 flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault()
        const subject = encodeURIComponent('Newsletter subscription')
        const body = encodeURIComponent(`Please subscribe ${email} to the Godoma TTI newsletter.`)
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-11 flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <Button type="submit" className="h-11 bg-accent px-5 font-bold text-accent-foreground hover:bg-accent/90">
        <Send aria-hidden="true" />
        Subscribe
      </Button>
    </form>
  )
}
