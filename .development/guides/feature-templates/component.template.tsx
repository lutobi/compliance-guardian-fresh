import React from 'react';
import { use{{FeatureName}} } from '@/hooks/{{featureName}}/use{{FeatureName}}';

export function {{FeatureName}}Component() {
  const { data, isLoading, error } = use{{FeatureName}}();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Implement your component */}
    </div>
  );
}
