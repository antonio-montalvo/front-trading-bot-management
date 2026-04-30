import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BrokerService } from '../../../broker/services/broker.service';

interface AccountView {
  id: string;
  equity: number;
  cash: number;
  buying_power: number;
  portfolio_value: number;
  currency: string;
  status: string;
}

@Component({
  selector: 'app-dashboard-page',
  imports: [CurrencyPipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage implements OnInit {
  account = signal<AccountView | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private readonly brokerService: BrokerService) {}

  ngOnInit(): void {
    this.brokerService.getAccount().subscribe({
      next: (data) => {
        this.account.set({
          id: data.id,
          equity: parseFloat(data.equity) || 0,
          cash: parseFloat(data.cash) || 0,
          buying_power: parseFloat(data.buying_power) || 0,
          portfolio_value: parseFloat(data.portfolio_value) || 0,
          currency: data.currency || 'USD',
          status: (data.status || '').replace('AccountStatus.', ''),
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.detail || 'Error al obtener datos de la cuenta');
        this.loading.set(false);
      },
    });
  }
}
