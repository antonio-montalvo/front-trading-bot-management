import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StrategyWithParameters, StrategyParameter } from '../../models/strategy.model';
import { StrategyService } from '../../services/strategy.service';

@Component({
  selector: 'app-strategy-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './strategy-detail-page.html',
  styleUrl: './strategy-detail-page.scss'
})
export class StrategyDetailPage implements OnInit {
  strategy = signal<StrategyWithParameters | null>(null);
  parameters = signal<StrategyParameter[]>([]);
  loading = signal(false);
  loadingParameters = signal(false);
  error = signal<string | null>(null);
  editing = signal(false);
  editingParam = signal<string | null>(null);
  paramEditValue = '';

  editForm = {
    name: '',
    type: '',
    description: ''
  };

  private strategyId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.strategyId = this.route.snapshot.paramMap.get('id') || '';
    if (this.strategyId) {
      this.loadStrategy();
    }
  }

  loadStrategy(): void {
    this.loading.set(true);
    this.error.set(null);

    this.strategyService.getById(this.strategyId).subscribe({
      next: (strategy) => {
        this.strategy.set(strategy);
        this.parameters.set(strategy.parameters || []);
        this.resetEditForm();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error cargando estrategia');
        this.loading.set(false);
        console.error('Error loading strategy:', err);
      }
    });
  }

  toggleEdit(): void {
    if (this.editing()) {
      this.resetEditForm();
    }
    this.editing.set(!this.editing());
  }

  resetEditForm(): void {
    const strat = this.strategy();
    if (strat) {
      this.editForm = {
        name: strat.name,
        type: strat.type,
        description: strat.description
      };
    }
  }

  cancelEdit(): void {
    this.resetEditForm();
    this.editing.set(false);
  }

  saveChanges(): void {
    if (!this.strategyId) return;

    this.strategyService.update(this.strategyId, this.editForm).subscribe({
      next: () => {
        this.editing.set(false);
        this.loadStrategy();
      },
      error: (err) => {
        console.error('Error updating strategy:', err);
        this.error.set('Error al actualizar estrategia');
      }
    });
  }

  toggleActive(): void {
    const strat = this.strategy();
    if (!strat) return;

    const action = strat.is_active
      ? this.strategyService.deactivate(strat.id)
      : this.strategyService.activate(strat.id);

    action.subscribe({
      next: () => {
        this.loadStrategy();
      },
      error: (err) => {
        console.error('Error toggling strategy:', err);
        this.error.set('Error al cambiar estado');
      }
    });
  }

  deleteStrategy(): void {
    if (!confirm('¿Estás seguro de eliminar esta estrategia?')) return;

    this.strategyService.delete(this.strategyId).subscribe({
      next: () => {
        this.router.navigate(['/strategies']);
      },
      error: (err) => {
        console.error('Error deleting strategy:', err);
        this.error.set('Error al eliminar estrategia');
      }
    });
  }

  editParameter(param: StrategyParameter): void {
    this.editingParam.set(param.id);
    this.paramEditValue = param.param_value;
  }

  cancelParamEdit(): void {
    this.editingParam.set(null);
    this.paramEditValue = '';
  }

  saveParameter(param: StrategyParameter): void {
    this.strategyService.updateParameter(
      this.strategyId,
      param.id,
      { param_value: this.paramEditValue }
    ).subscribe({
      next: () => {
        this.editingParam.set(null);
        this.loadStrategy();
      },
      error: (err) => {
        console.error('Error updating parameter:', err);
        this.error.set('Error al actualizar parámetro');
      }
    });
  }

  deleteParameter(paramId: string): void {
    if (!confirm('¿Eliminar este parámetro?')) return;

    this.strategyService.deleteParameter(this.strategyId, paramId).subscribe({
      next: () => {
        this.loadStrategy();
      },
      error: (err) => {
        console.error('Error deleting parameter:', err);
        this.error.set('Error al eliminar parámetro');
      }
    });
  }

  addParameter(): void {
    this.router.navigate(['/strategies', this.strategyId, 'parameters', 'new']);
  }

  goBack(): void {
    this.router.navigate(['/strategies']);
  }
}
