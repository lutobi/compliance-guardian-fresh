'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'
import { useToast } from '@/components/ui/use-toast'

interface AuthContextType {
  user: User | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const setData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:', error)
        toast({
          title: 'Error',
          description: 'Failed to get session',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    setData()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, toast])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.refresh()
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Error signing in:', error)
      toast({
        title: 'Error signing in',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      toast({
        title: 'Check your email',
        description: 'We sent you a confirmation link',
      })
    } catch (error: any) {
      console.error('Error signing up:', error)
      toast({
        title: 'Error signing up',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.refresh()
      router.push('/')
    } catch (error: any) {
      console.error('Error signing out:', error)
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
