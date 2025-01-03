import { useQuery } from '@tanstack/react-query';
import { useSecurityContext } from '@/hooks/useSecurityContext';
import { {{FeatureName}}Service } from '@/services/{{featureName}}';
import type { {{FeatureName}}Config } from '@/services/{{featureName}}';

export function use{{FeatureName}}() {
  const context = useSecurityContext();
  const service = new {{FeatureName}}Service(context);

  return useQuery<{{FeatureName}}Config>({
    queryKey: ['{{featureName}}', context.user?.id],
    queryFn: () => service.get{{FeatureName}}Config(),
    enabled: !!context.user
  });
}
