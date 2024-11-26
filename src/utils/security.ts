import { createHash } from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { UserMFA, PasswordHistory, AuditLog, RateLimit, AuditEventType } from '../types/security'

/**
 * Security utility functions for the Compliance Guardian application
 */

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Generates a secure hash of the input string using SHA-256
 */
export const hashString = async (input: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Validates input against XSS and injection attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/javascript[:;]/gi, '') // Remove JavaScript protocol
    .replace(/on\w+\s*=\s*["']?[^"']*["']?/gi, '') // Remove event handlers
    .replace(/data[:;]/gi, '') // Remove data URI schemes
    .replace(/\balert\s*\([^)]*\)/gi, '') // Remove alert() calls
    .replace(/\b(eval|setTimeout|setInterval)\s*\([^)]*\)/gi, '') // Remove dangerous function calls
    .trim()
}

/**
 * Validates and sanitizes evidence content
 */
export const validateEvidence = (evidence: string): { isValid: boolean; sanitized: string; error?: string } => {
  if (!evidence) {
    return { isValid: false, sanitized: '', error: 'Evidence cannot be empty' }
  }

  if (evidence.length > 10000) {
    return { isValid: false, sanitized: '', error: 'Evidence content too long' }
  }

  const sanitized = sanitizeInput(evidence)
  return { isValid: true, sanitized }
}

/**
 * Generates a secure random token
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validates and sanitizes framework control IDs
 */
export const validateControlId = (id: string): boolean => {
  // Control IDs should follow a specific format (e.g., "A.1.2.3")
  const controlIdPattern = /^[A-Z]\.\d+(\.\d+)*$/
  return controlIdPattern.test(id)
}

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; firstAttempt: number }> = new Map()
  private readonly maxAttempts: number
  private readonly timeWindow: number // in milliseconds

  constructor(maxAttempts: number = 5, timeWindow: number = 60000) {
    this.maxAttempts = maxAttempts
    this.timeWindow = timeWindow
  }

  isRateLimited(key: string): boolean {
    const now = Date.now()
    const attempt = this.attempts.get(key)

    if (!attempt) {
      this.attempts.set(key, { count: 1, firstAttempt: now })
      return false
    }

    if (now - attempt.firstAttempt > this.timeWindow) {
      this.attempts.set(key, { count: 1, firstAttempt: now })
      return false
    }

    if (attempt.count >= this.maxAttempts) {
      return true
    }

    this.attempts.set(key, { count: attempt.count + 1, firstAttempt: attempt.firstAttempt })
    return false
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

// Create a global rate limiter instance
export const globalRateLimiter = new RateLimiter()

// Database Security Functions

/**
 * MFA Management Functions
 */
export const mfaUtils = {
  async enable(userId: string): Promise<UserMFA | null> {
    const secret = generateSecureToken()
    const { data, error } = await supabase
      .from('user_mfa')
      .upsert({ user_id: userId, secret, enabled: true })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async disable(userId: string): Promise<void> {
    const { error } = await supabase
      .from('user_mfa')
      .update({ enabled: false })
      .eq('user_id', userId)
    
    if (error) throw error
  },

  async getStatus(userId: string): Promise<UserMFA | null> {
    const { data, error } = await supabase
      .from('user_mfa')
      .select()
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
    return data
  }
}

/**
 * Password History Management
 */
export const passwordUtils = {
  async addToHistory(userId: string, password: string): Promise<void> {
    const passwordHash = await hashString(password)
    const { error } = await supabase
      .from('password_history')
      .insert({ user_id: userId, password_hash: passwordHash })
    
    if (error) throw error
  },

  async isPasswordReused(userId: string, password: string): Promise<boolean> {
    const passwordHash = await hashString(password)
    const { data, error } = await supabase
      .from('password_history')
      .select()
      .eq('user_id', userId)
      .eq('password_hash', passwordHash)
    
    if (error) throw error
    return data.length > 0
  }
}

/**
 * Audit Logging
 */
export const auditUtils = {
  async log(event: {
    userId?: string,
    eventType: AuditEventType,
    eventData: any,
    ipAddress?: string,
    userAgent?: string
  }): Promise<void> {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: event.userId,
        event_type: event.eventType,
        event_data: JSON.stringify(event.eventData),
        ip_address: event.ipAddress,
        user_agent: event.userAgent
      })
    
    if (error) throw error
  },

  async getAuditLogs(userId?: string, eventType?: AuditEventType): Promise<AuditLog[]> {
    let query = supabase
      .from('audit_logs')
      .select()
      .order('timestamp', { ascending: false })
    
    if (userId) query = query.eq('user_id', userId)
    if (eventType) query = query.eq('event_type', eventType)
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
}

/**
 * Rate Limiting with Database
 */
export const rateLimitUtils = {
  async isRateLimited(key: string, limit: number, windowMs: number): Promise<boolean> {
    const now = new Date()
    const resetAt = new Date(now.getTime() + windowMs)
    
    // Clean up expired entries
    await supabase
      .from('rate_limit')
      .delete()
      .lt('reset_at', now.toISOString())
    
    // Get or create rate limit entry
    const { data, error } = await supabase
      .from('rate_limit')
      .upsert({
        key,
        count: 1,
        reset_at: resetAt.toISOString()
      }, {
        onConflict: 'key',
        ignoreDuplicates: false
      })
      .select()
      .single()
    
    if (error) throw error
    return data.count >= limit
  },

  async increment(key: string): Promise<void> {
    const { error } = await supabase.rpc('increment_rate_limit', { key_param: key })
    if (error) throw error
  }
}
