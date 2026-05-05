import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private readonly http: HttpClient) {}

  getApiKeys(): Observable<unknown> {
    return this.http.get(environment.authApiKeys);
  }

  createApiKey(body: unknown): Observable<unknown> {
    return this.http.post(environment.authApiKeys, body);
  }
}
