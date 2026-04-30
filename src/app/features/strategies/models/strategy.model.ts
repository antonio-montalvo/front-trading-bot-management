export interface Strategy {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
}
