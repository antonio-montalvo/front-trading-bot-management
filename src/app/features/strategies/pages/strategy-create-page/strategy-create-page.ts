import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StrategyForm } from '../../components/strategy-form/strategy-form';
import { Strategy } from '../../models/strategy.model';

@Component({
  selector: 'app-strategy-create-page',
  standalone: true,
  imports: [CommonModule, StrategyForm],
  template: `
    <div class="page">
      <div class="page-header">
        <div class="header-left">
          <button class="btn-back" (click)="goBack()">← Volver</button>
          <h3>Nueva Estrategia</h3>
        </div>
      </div>

      <div class="form-container">
        <app-strategy-form
          [isEdit]="false"
          (saved)="onSaved($event)"
          (cancelled)="onCancelled()">
        </app-strategy-form>
      </div>
    </div>
  `,
  styles: [`
    @use 'page';

    .form-container {
      max-width: 800px;
      margin: 2rem auto;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;

      .btn-back {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: var(--bg-hover);
          border-color: var(--primary-color);
        }
      }

      h3 {
        margin: 0;
      }
    }
  `]
})
export class StrategyCreatePage {
  constructor(private readonly router: Router) {}

  onSaved(strategy: Strategy): void {
    this.router.navigate(['/strategies', strategy.id]);
  }

  onCancelled(): void {
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/strategies']);
  }
}
