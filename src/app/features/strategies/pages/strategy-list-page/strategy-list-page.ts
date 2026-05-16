import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Strategy } from '../../models/strategy.model';
import { StrategyService } from '../../services/strategy.service';

@Component({
  selector: 'app-strategy-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './strategy-list-page.html',
  styleUrl: './strategy-list-page.scss'
})
export class StrategyListPage implements OnInit {
  strategies = signal<Strategy[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private readonly strategyService: StrategyService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadStrategies();
  }

  loadStrategies(): void {
    this.loading.set(true);
    this.error.set(null);

    this.strategyService.getAll().subscribe({
      next: (strategies) => {
        this.strategies.set(strategies);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error cargando estrategias');
        this.loading.set(false);
        console.error('Error loading strategies:', err);
      }
    });
  }

  viewDetails(strategyId: string): void {
    this.router.navigate(['/strategies', strategyId]);
  }

  createStrategy(): void {
    this.router.navigate(['/strategies/new']);
  }

  toggleActive(strategy: Strategy): void {
    const action = strategy.is_active 
      ? this.strategyService.deactivate(strategy.id)
      : this.strategyService.activate(strategy.id);

    action.subscribe({
      next: () => {
        this.loadStrategies();
      },
      error: (err) => {
        console.error('Error toggling strategy:', err);
        this.error.set('Error al cambiar estado de estrategia');
      }
    });
  }
}
