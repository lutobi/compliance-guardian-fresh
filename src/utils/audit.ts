import { createClient } from '@supabase/supabase-js'
import { EncryptionService } from './encryption'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export enum AuditEventType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  MFA_ENABLE = 'MFA_ENABLE',
  MFA_DISABLE = 'MFA_DISABLE',
  EVIDENCE_CREATE = 'EVIDENCE_CREATE',
  EVIDENCE_UPDATE = 'EVIDENCE_UPDATE',
  EVIDENCE_DELETE = 'EVIDENCE_DELETE',
  CONTROL_UPDATE = 'CONTROL_UPDATE',
  ASSESSMENT_CREATE = 'ASSESSMENT_CREATE',
  ASSESSMENT_UPDATE = 'ASSESSMENT_UPDATE',
  ASSESSMENT_DELETE = 'ASSESSMENT_DELETE',
  USER_CREATE = 'USER_CREATE',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  API_ACCESS = 'API_ACCESS',
  DATA_EXPORT = 'DATA_EXPORT',
  SETTINGS_CHANGE = 'SETTINGS_CHANGE'
}

export interface AuditEvent {
  userId: string
  eventType: AuditEventType
  eventData: object
  ipAddress: string
  userAgent: string
  timestamp: Date
}

export class AuditService {
  private static readonly encryptionKey = process.env.AUDIT_ENCRYPTION_KEY || 'default-audit-key'

  // Log audit event
  static async logEvent(event: AuditEvent): Promise<void> {
    try {
      // Encrypt sensitive data
      const encryptedEventData = await EncryptionService.encrypt(
        JSON.stringify(event.eventData),
        this.encryptionKey
      )

      // Store in Supabase
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: event.userId,
          event_type: event.eventType,
          event_data: encryptedEventData,
          ip_address: event.ipAddress,
          user_agent: event.userAgent,
          timestamp: event.timestamp.toISOString()
        })

      if (error) {
        console.error('Failed to log audit event:', error)
      }
    } catch (error) {
      console.error('Error logging audit event:', error)
    }
  }

  // Query audit logs
  static async queryLogs(
    filters: {
      userId?: string
      eventType?: AuditEventType
      startDate?: Date
      endDate?: Date
    },
    page = 1,
    pageSize = 50
  ): Promise<{
    logs: AuditEvent[]
    total: number
  }> {
    let query = supabase
      .from('audit_logs')
      .select('*', { count: 'exact' })

    // Apply filters
    if (filters.userId) {
      query = query.eq('user_id', filters.userId)
    }
    if (filters.eventType) {
      query = query.eq('event_type', filters.eventType)
    }
    if (filters.startDate) {
      query = query.gte('timestamp', filters.startDate.toISOString())
    }
    if (filters.endDate) {
      query = query.lte('timestamp', filters.endDate.toISOString())
    }

    // Add pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    // Execute query
    const { data, error, count } = await query

    if (error) {
      throw new Error('Failed to query audit logs')
    }

    // Decrypt event data
    const logs = await Promise.all(
      data.map(async log => ({
        userId: log.user_id,
        eventType: log.event_type as AuditEventType,
        eventData: JSON.parse(
          await EncryptionService.decrypt(log.event_data, this.encryptionKey)
        ),
        ipAddress: log.ip_address,
        userAgent: log.user_agent,
        timestamp: new Date(log.timestamp)
      }))
    )

    return {
      logs,
      total: count || 0
    }
  }

  // Get audit summary
  static async getAuditSummary(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalEvents: number
    eventsByType: Record<AuditEventType, number>
    activeUsers: number
    topUsers: Array<{ userId: string; eventCount: number }>
  }> {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString())

    if (error) {
      throw new Error('Failed to get audit summary')
    }

    // Process data
    const eventsByType: Record<string, number> = {}
    const userEvents: Record<string, number> = {}

    data.forEach(log => {
      // Count events by type
      eventsByType[log.event_type] = (eventsByType[log.event_type] || 0) + 1

      // Count events by user
      userEvents[log.user_id] = (userEvents[log.user_id] || 0) + 1
    })

    // Get top users
    const topUsers = Object.entries(userEvents)
      .map(([userId, count]) => ({ userId, eventCount: count }))
      .sort((a, b) => b.eventCount - a.eventCount)
      .slice(0, 10)

    return {
      totalEvents: data.length,
      eventsByType: eventsByType as Record<AuditEventType, number>,
      activeUsers: Object.keys(userEvents).length,
      topUsers
    }
  }
}
