import { Analytics } from '@vercel/analytics/next'
import { Geist } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { CookieConsent } from '@/components/site/cookie-consent'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://godomatti.ac.ke'),
  title: {
    default: 'Godoma Technical Training Institute | TVET College in Kilifi, Kenya',
    template: '%s | Godoma TTI',
  },
  description:
    'Godoma Technical Training Institute is a public TVET college in Vitengeni, Kilifi County, Kenya offering TVET CDACC courses in engineering, ICT, business, hospitality and agriculture.',
  keywords: [
    'Godoma Technical Training Institute',
    'Godoma TTI',
    'TVET colleges in Kenya',
    'technical colleges in Kilifi',
    'TVET courses in Kilifi',
    'TVET CDACC courses Kenya',
    'technical training institute Kenya',
    'study in Kilifi',
  ],
  applicationName: 'Godoma Technical Training Institute',
  category: 'education',
  creator: 'Godoma Technical Training Institute',
  publisher: 'Godoma Technical Training Institute',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'Godoma Technical Training Institute',
    title: 'Godoma Technical Training Institute | TVET College in Kilifi, Kenya',
    description: 'Public TVET training in Kilifi County with TVET CDACC courses in engineering, ICT, business, hospitality and agriculture.',
    images: [{ url: '/images/logo.webp', width: 512, height: 512, alt: 'Godoma Technical Training Institute logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Godoma Technical Training Institute | TVET College in Kilifi, Kenya',
    description: 'Public TVET training and skills development in Kilifi County, Kenya.',
    images: ['/images/logo.webp'],
  },
  robots: { index: true, follow: true },
  generator: 'v0.app',
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1D3F8B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
