import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/login-form'
import { getSession } from '@/lib/auth/session'
import { databaseConfigured } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage() {
  const configured = databaseConfigured()
  if (configured && (await getSession().catch(() => null))) redirect('/admin')

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/images/godoma-main-logo.webp" alt="" width={72} height={72} className="h-18 w-auto" priority />
          <h1 className="mt-4 text-2xl font-extrabold text-primary">Godoma TTI administration</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage the website content.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          {configured ? (
            <LoginForm />
          ) : (
            <p role="alert" className="text-sm text-destructive">
              The database is not configured. Set the DB_NAME, DB_USER and DB_PASSWORD environment variables, then reload this page.
            </p>
          )}
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-semibold text-primary underline-offset-4 hover:underline">
            Back to the public website
          </Link>
        </p>
      </div>
    </main>
  )
}
