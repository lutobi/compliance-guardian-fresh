export interface Organization {
  id: string
  name: string
  description?: string
  logo_url?: string
  created_at: string
  updated_at: string
}

export interface OrganizationMember {
  id: string
  organization_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  created_at: string
  updated_at: string
}

export interface OrganizationInvite {
  id: string
  organization_id: string
  email: string
  role: 'admin' | 'member'
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  expires_at: string
}
