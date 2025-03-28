export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  OPENAI_API_URL: process.env.NEXT_PUBLIC_OPENAI_API_URL!,
} as const


const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_OPENAI_API_KEY',
  'NEXT_PUBLIC_OPENAI_API_URL',
] as const

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
} 