import { NextResponse, type NextRequest } from 'next/server'

// Optimistic gate only: it keeps anonymous visitors off admin URLs. Every page, server action and
// route handler still verifies the session against the database (see lib/auth/session.ts).
const cookieNames = ['__Host-godoma_session', 'godoma_session']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLogin = pathname === '/admin/login'
  const hasCookie = cookieNames.some((name) => request.cookies.has(name))

  if (!isLogin && !hasCookie) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
