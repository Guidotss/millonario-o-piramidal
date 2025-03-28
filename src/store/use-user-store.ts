import { create } from 'zustand'
import { Session } from '@supabase/supabase-js'

type User = {
  email: string
  plan: string
  ideasToday: number
}

interface UserState {
  session: Session | null
  user: User | null
  setSession: (session: Session | null) => void
  setUser: (user: User | null) => void
  incrementIdeasToday: () => void
  logout: () => void
}

const STORAGE_KEY = 'supabase_session'
const IDEAS_COUNTER_KEY = 'ideas_counter'

const getIdeasCounter = () => {
  if (typeof window === 'undefined') return 0
  const today = new Date().toDateString()
  const counter = localStorage.getItem(IDEAS_COUNTER_KEY)
  if (!counter) return 0
  
  const { date, count } = JSON.parse(counter)
  if (date !== today) return 0
  return count
}

const setIdeasCounter = (count: number) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(IDEAS_COUNTER_KEY, JSON.stringify({
    date: new Date().toDateString(),
    count
  }))
}

export const useUserStore = create<UserState>((set) => ({
  session: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') : null,
  user: typeof window !== 'undefined' ? (() => {
    const session = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (session?.user) {
      return {
        email: session.user.email || "",
        plan: session.user.user_metadata.plan || "Free",
        ideasToday: getIdeasCounter()
      }
    }
    return null
  })() : null,
  setSession: (session) => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      set({ 
        session,
        user: {
          email: session.user.email || "",
          plan: session.user.user_metadata.plan || "Free",
          ideasToday: getIdeasCounter()
        }
      })
    } else {
      localStorage.removeItem(STORAGE_KEY)
      set({ session: null, user: null })
    }
  },
  setUser: (user) => set({ user }),
  incrementIdeasToday: () => {
    set((state) => {
      if (!state.user) return state
      const newCount = state.user.ideasToday + 1
      setIdeasCounter(newCount)
      return {
        user: {
          ...state.user,
          ideasToday: newCount
        }
      }
    })
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ session: null, user: null })
  },
}))
