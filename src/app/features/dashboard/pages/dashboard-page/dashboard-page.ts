import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService, BotInstance } from '../../../../core/services/auth.service';
import { BotService } from '../../../bots/services/bot.service';
import { NotificationService } from '../../../../core/services/notification.service';

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
  botsSummary = signal<DashboardSummary[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  openMenuId = signal<string | null>(null);

  private readonly bots: BotInstance[];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly authService: AuthService,
    private readonly botService: BotService,
    private readonly notificationService: NotificationService
  ) {
    this.bots = this.authService.getBots();
  }

  ngOnInit(): void {
    if (!this.bots.length) {
      this.error.set('No se encontraron bots asociados a tu cuenta');
      this.loading.set(false);
      return;
    }

    const requests = this.bots.map(bot =>
      this.dashboardService.getSummary(bot.id)
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.botsSummary.set(results as DashboardSummary[]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.detail || 'Error al obtener datos del dashboard');
        this.loading.set(false);
      },
    });
  }

  toggleMenu(botId: string): void {
    this.openMenuId.set(this.openMenuId() === botId ? null : botId);
  }

  startBot(botId: string): void {
    this.openMenuId.set(null);
    this.botService.startBot(botId).subscribe({
      next: () => {
        this.notificationService.success('Bot iniciado exitosamente');
        this.refreshDashboard();
      },
      error: (err) => {
        this.notificationService.error(err.error?.detail || 'Error al iniciar el bot');
      },
    });
  }

  stopBot(botId: string): void {
    this.openMenuId.set(null);
    this.botService.stopBot(botId).subscribe({
      next: () => {
        this.notificationService.success('Bot detenido exitosamente');
        this.refreshDashboard();
      },
      error: (err) => {
        this.notificationService.error(err.error?.detail || 'Error al detener el bot');
      },
    });
  }

  deleteBot(botId: string): void {
    this.openMenuId.set(null);
    
    if (!confirm('¿Estás seguro de que deseas eliminar este bot? Esta acción no se puede deshacer.')) {
      return;
    }

    this.botService.deleteBot(botId).subscribe({
      next: () => {
        this.notificationService.success('Bot eliminado exitosamente');
        this.refreshDashboard();
      },
      error: (err) => {
        this.notificationService.error(err.error?.detail || 'Error al eliminar el bot');
      },
    });
  }

  private refreshDashboard(): void {
    this.loading.set(true);
    const requests = this.bots.map(bot =>
      this.dashboardService.getSummary(bot.id)
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.botsSummary.set(results as DashboardSummary[]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.detail || 'Error al obtener datos del dashboard');
        this.loading.set(false);
      },
    });
  }
}
