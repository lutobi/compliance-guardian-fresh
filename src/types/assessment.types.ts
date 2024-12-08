export interface AssessmentControl {
  id: string;
  assessment_id: string;
  control_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'not_applicable';
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface Evidence {
  id: string;
  title: string;
  file_url: string;
  created_at: string;
}

export type Assessment = {
  id: string;
  name: string;
  description: string | null;
  framework_id: string;
  start_date: string;
  end_date: string | null;
  status: 'planned' | 'in_progress' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  controls: AssessmentControl[];
}
