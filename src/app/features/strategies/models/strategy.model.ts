export interface Strategy {
  id: string;
  bot_id: string;
  name: string;
  type: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export interface StrategyParameter {
  id: string;
  strategy_id: string;
  param_key: string;
  param_value: string;
  data_type: 'int' | 'float' | 'str' | 'bool' | 'list';
  created_at: string;
}

export interface StrategyWithParameters extends Strategy {
  parameters: StrategyParameter[];
}

export interface StrategyCreateRequest {
  bot_id: string;
  name: string;
  type: string;
  description: string;
}

export interface StrategyParameterCreateRequest {
  param_key: string;
  param_value: string;
  data_type: 'int' | 'float' | 'str' | 'bool' | 'list';
}
