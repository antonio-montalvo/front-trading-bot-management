import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Strategy } from '../models/strategy.model';

@Injectable({ providedIn: 'root' })
export class StrategyService {
  private readonly baseUrl = `${environment.apiUrl}/strategies`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(this.baseUrl);
  }

  getById(id: string): Observable<Strategy> {
    return this.http.get<Strategy>(`${this.baseUrl}/${id}`);
  }
}
