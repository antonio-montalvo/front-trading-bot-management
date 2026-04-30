export interface Bot {
  id: string;
  name: string;
  strategy_id: string;
  status: 'running' | 'stopped' | 'error';
  created_at: string;
  updated_at: string;
}
