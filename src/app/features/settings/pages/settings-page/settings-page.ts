import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

interface BotCreateRequest {
  name: string;
  broker_name: string;
  environment: string;
}

interface BotCreateResponse {
  id: string;
  name: string;
  broker_name: string;
  environment: string;
  status: string;
  strategy_id?: string;
}

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage {
  createBotForm: FormGroup;
  submitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService
  ) {
    this.createBotForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      broker_name: ['alpaca', Validators.required],
      environment: ['paper', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.createBotForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.createBotForm.invalid) {
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const payload: BotCreateRequest = this.createBotForm.value;

    this.http.post<BotCreateResponse>(`${environment.apiUrl}/bot/create`, payload)
      .subscribe({
        next: (response) => {
          this.submitting.set(false);
          this.successMessage.set(`Bot "${response.name}" creado exitosamente`);
          this.notificationService.success('Bot creado exitosamente');
          this.createBotForm.reset({
            broker_name: 'alpaca',
            environment: 'paper'
          });
          
          // Clear success message after 5 seconds
          setTimeout(() => this.successMessage.set(null), 5000);
        },
        error: (err) => {
          this.submitting.set(false);
          const errorMsg = err.error?.detail || 'Error al crear el bot';
          this.errorMessage.set(errorMsg);
          this.notificationService.error(errorMsg);
        }
      });
  }
}
