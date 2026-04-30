export interface ApiKey {
  id: string;
  broker_name: string;
  environment: string;
  is_active: boolean;
  created_at: string;
}

export interface ApiKeyCreate {
  broker_name: string;
  environment: string;
  api_key: string;
  secret_key: string;
}
