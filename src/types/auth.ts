export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Session {
  user: User
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: Error | null
}
