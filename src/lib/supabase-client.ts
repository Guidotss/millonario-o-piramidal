import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createBrowserClient } from '@supabase/ssr'
import { env } from './env'

export const createSupabaseBrowserClient = () =>
  createBrowserClient(env.supabase.url, env.supabase.anonKey)

export const createSupabaseServerClient = () => {
  return createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      async get(name: string) {
        const cookieStore = await cookies()
        return cookieStore.get(name)?.value
      },
      async set(name: string, value: string, options: CookieOptions) {
        const cookieStore = await cookies()
        cookieStore.set(name, value, options)
      },
      async remove(name: string, options: CookieOptions) {
        const cookieStore = await cookies()
        cookieStore.set(name, '', { ...options, maxAge: 0 })
      },
    },
  })
}
