import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-client'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createSupabaseServerClient()

  const { data: { session } } = await supabase.auth.getSession()

  
  const protectedRoutes = ['/dashboard', '/pro']

  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!session) {
      return NextResponse.redirect(new URL('/(auth)/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/pro/:path*'],
}
