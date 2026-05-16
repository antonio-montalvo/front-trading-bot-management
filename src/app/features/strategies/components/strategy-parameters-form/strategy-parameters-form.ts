import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StrategyParameter, StrategyParameterCreateRequest } from '../../models/strategy.model';
import { StrategyService } from '../../services/strategy.service';

@Component({
  selector: 'app-strategy-parameters-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './strategy-parameters-form.html',
  styleUrl: './strategy-parameters-form.scss'
})
export class StrategyParametersForm implements OnInit {
  @Input() strategyId!: string;
  @Input() parameter?: StrategyParameter;
  @Input() isEdit = false;
  @Output() saved = new EventEmitter<StrategyParameter>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  submitting = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      param_key: [this.parameter?.param_key || '', Validators.required],
      param_value: [this.parameter?.param_value || '', Validators.required],
      data_type: [this.parameter?.data_type || '', Validators.required]
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

    const formValue: StrategyParameterCreateRequest = this.form.value;

    if (this.isEdit && this.parameter) {
      this.strategyService.updateParameter(this.strategyId, this.parameter.id, formValue).subscribe({
        next: (parameter) => {
          this.success.set('Parámetro actualizado exitosamente');
          this.submitting.set(false);
          setTimeout(() => this.saved.emit(parameter), 1000);
        },
        error: (err) => {
          this.error.set('Error al actualizar parámetro');
          this.submitting.set(false);
          console.error('Error updating parameter:', err);
        }
      });
    } else {
      this.strategyService.createParameter(this.strategyId, formValue).subscribe({
        next: (parameter) => {
          this.success.set('Parámetro creado exitosamente');
          this.submitting.set(false);
          this.form.reset();
          setTimeout(() => this.saved.emit(parameter), 1000);
        },
        error: (err) => {
          this.error.set('Error al crear parámetro');
          this.submitting.set(false);
          console.error('Error creating parameter:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
