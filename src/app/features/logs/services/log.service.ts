import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LogEntry } from '../models/log.model';

@Injectable({ providedIn: 'root' })
export class LogService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(`${environment.apiUrl}/logs`);
  }
}
