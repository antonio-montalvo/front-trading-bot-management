export const environment = {
  production: true,
  apiUrl: '/api',

  // Auth
  authLogin: '/api/auth/login',
  authRegister: '/api/auth/register',
  authRefresh: '/api/auth/refresh',
  authApiKeys: '/api/auth/api-keys',

  // Bot
  botStart: '/api/bot/start',
  botStop: '/api/bot/stop',
  botStatus: '/api/bot/status',

  // Broker
  brokerAccount: '/api/broker/account',
  brokerPositions: '/api/broker/positions',
  brokerOrders: '/api/broker/orders',

  // Metrics
  metricsPnl: '/api/metrics/pnl',
  metricsPerformance: '/api/metrics/performance',

  // Strategies
  strategies: '/api/strategies',
};
