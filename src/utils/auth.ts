import { createClient } from '@supabase/supabase-js'
import { hashString } from './security'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Password policy configuration
const PASSWORD_POLICY = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
  preventReuse: 5 // Number of previous passwords to check
}

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

export class AuthService {
  // Validate password against policy
  static validatePassword(password: string): PasswordValidationResult {
    const errors: string[] = []

    if (password.length < PASSWORD_POLICY.minLength) {
      errors.push(`Password must be at least ${PASSWORD_POLICY.minLength} characters long`)
    }

    if (PASSWORD_POLICY.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (PASSWORD_POLICY.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (PASSWORD_POLICY.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (PASSWORD_POLICY.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Generate MFA secret
  static async generateMFASecret(userId: string): Promise<{ secret: string; qrCode: string }> {
    const secret = authenticator.generateSecret()
    
    // Store the secret in Supabase
    const { error } = await supabase
      .from('user_mfa')
      .upsert({ 
        user_id: userId,
        secret: secret,
        enabled: false
      })

    if (error) {
      throw new Error('Failed to store MFA secret')
    }

    // Generate QR code
    const otpauth = authenticator.keyuri(
      userId,
      'Compliance Guardian',
      secret
    )

    const qrCode = await QRCode.toDataURL(otpauth)

    return { secret, qrCode }
  }

  // Verify MFA token
  static async verifyMFAToken(userId: string, token: string): Promise<boolean> {
    // Get user's MFA secret
    const { data, error } = await supabase
      .from('user_mfa')
      .select('secret')
      .eq('user_id', userId)
      .single()

    if (error || !data?.secret) {
      throw new Error('Failed to get MFA secret')
    }

    return authenticator.verify({
      token,
      secret: data.secret
    })
  }

  // Enable MFA for user
  static async enableMFA(userId: string, token: string): Promise<boolean> {
    const isValid = await this.verifyMFAToken(userId, token)

    if (!isValid) {
      return false
    }

    const { error } = await supabase
      .from('user_mfa')
      .update({ enabled: true })
      .eq('user_id', userId)

    return !error
  }

  // Check if password has been used before
  static async checkPasswordHistory(userId: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await hashString(newPassword)
    
    const { data, error } = await supabase
      .from('password_history')
      .select('password_hash')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(PASSWORD_POLICY.preventReuse)

    if (error) {
      throw new Error('Failed to check password history')
    }

    return data.some(record => record.password_hash === hashedPassword)
  }

  // Update password with history tracking
  static async updatePassword(userId: string, newPassword: string): Promise<void> {
    const validation = this.validatePassword(newPassword)
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '))
    }

    const isReused = await this.checkPasswordHistory(userId, newPassword)
    if (isReused) {
      throw new Error(`Cannot reuse any of your last ${PASSWORD_POLICY.preventReuse} passwords`)
    }

    const hashedPassword = await hashString(newPassword)

    // Store new password hash in history
    const { error: historyError } = await supabase
      .from('password_history')
      .insert({
        user_id: userId,
        password_hash: hashedPassword
      })

    if (historyError) {
      throw new Error('Failed to update password history')
    }

    // Update user's password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (updateError) {
      throw new Error('Failed to update password')
    }
  }
}
