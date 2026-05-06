import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

export interface DashboardSummary {
  bot: {
    id: string;
    name: string;
    status: string;
    environment: string;
    last_run_at: string | null;
  };
  account: {
    equity: number;
    cash: number;
    buying_power: number;
    currency: string;
  };
  performance: {
    daily_pnl: number;
    total_pnl: number;
    open_positions: number;
    orders_today: number;
  };
  positions: {
    symbol: string;
    qty: number;
    avg_price: number;
    current_price: number;
    unrealized_pnl: number;
  }[];
  recent_orders: {
    symbol: string;
    side: string;
    qty: number;
    status: string;
    submitted_at: string | null;
  }[];
  recent_logs: {
    level: string;
    message: string;
    created_at: string | null;
  }[];
}

@Component({
  selector: 'app-dashboard-page',
  imports: [CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage implements OnInit {
  data = signal<DashboardSummary | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  private readonly botId = localStorage.getItem('selected_bot_id') || '';

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    if (!this.botId) {
      this.error.set('No se ha seleccionado un bot');
      this.loading.set(false);
      return;
    }

    this.dashboardService.getSummary(this.botId).subscribe({
      next: (res) => {
        this.data.set(res as DashboardSummary);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.detail || 'Error al obtener datos del dashboard');
        this.loading.set(false);
      },
    });
  }
}
