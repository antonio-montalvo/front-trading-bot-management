import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly baseUrl = `${environment.apiUrl}/settings`;

  constructor(private readonly http: HttpClient) {}

  getSettings(): Observable<unknown> {
    return this.http.get(this.baseUrl);
  }

  updateSettings(settings: unknown): Observable<unknown> {
    return this.http.put(this.baseUrl, settings);
  }
}
