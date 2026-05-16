import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Strategy, StrategyCreateRequest } from '../../models/strategy.model';
import { StrategyService } from '../../services/strategy.service';
import { BotService } from '../../../bots/services/bot.service';
import { Bot } from '../../../bots/models/bot.model';

@Component({
  selector: 'app-strategy-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './strategy-form.html',
  styleUrl: './strategy-form.scss'
})
export class StrategyForm implements OnInit {
  @Input() strategy?: Strategy;
  @Input() isEdit = false;
  @Output() saved = new EventEmitter<Strategy>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  submitting = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  bots = signal<Bot[]>([]);
  loadingBots = signal(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly strategyService: StrategyService,
    private readonly botService: BotService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBots();
  }

  loadBots(): void {
    this.loadingBots.set(true);
    this.botService.getAllBots().subscribe({
      next: (bots) => {
        this.bots.set(bots);
        this.loadingBots.set(false);
      },
      error: (err) => {
        console.error('Error loading bots:', err);
        this.loadingBots.set(false);
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      bot_id: [this.strategy?.bot_id || '', Validators.required],
      name: [this.strategy?.name || '', Validators.required],
      type: [this.strategy?.type || '', Validators.required],
      description: [this.strategy?.description || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);
    this.success.set(null);

    const formValue: StrategyCreateRequest = this.form.value;

    if (this.isEdit && this.strategy) {
      this.strategyService.update(this.strategy.id, formValue).subscribe({
        next: (strategy) => {
          this.success.set('Estrategia actualizada exitosamente');
          this.submitting.set(false);
          setTimeout(() => this.saved.emit(strategy), 1000);
        },
        error: (err) => {
          this.error.set('Error al actualizar estrategia');
          this.submitting.set(false);
          console.error('Error updating strategy:', err);
        }
      });
    } else {
      this.strategyService.create(formValue).subscribe({
        next: (strategy) => {
          this.success.set('Estrategia creada exitosamente');
          this.submitting.set(false);
          this.form.reset();
          setTimeout(() => this.saved.emit(strategy), 1000);
        },
        error: (err) => {
          this.error.set('Error al crear estrategia');
          this.submitting.set(false);
          console.error('Error creating strategy:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
