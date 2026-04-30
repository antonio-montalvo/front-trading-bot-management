export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: string;
  qty: number;
  filled_avg_price: number;
  status: string;
  created_at: string;
}
