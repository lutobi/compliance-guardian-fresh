import { useQuery } from '@tanstack/react-query';
import { useSecurityContext } from '@/hooks/useSecurityContext';
import { AuditLogService } from '@/services/auditlog';
import type { AuditLogConfig } from '@/services/auditlog';

export function useAuditLog() {
  const context = useSecurityContext();
  const service = new AuditLogService(context);

  return useQuery<AuditLogConfig>({
    queryKey: ['auditlog', context.user?.id],
    queryFn: () => service.getAuditLogConfig(),
    enabled: !!context.user
  });
}
