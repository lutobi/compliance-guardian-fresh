import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export class SecureService {
  protected supabase = createClientComponentClient()

  protected async validateAccess() {
    const { data: { session }, error } = await this.supabase.auth.getSession()
    
    if (error || !session) {
      throw new Error('Unauthorized access')
    }

    return session
  }

  protected async validateAdmin() {
    const session = await this.validateAccess()
    const { data: user } = await this.supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!user || user.role !== 'admin') {
      throw new Error('Admin access required')
    }
  }
}
