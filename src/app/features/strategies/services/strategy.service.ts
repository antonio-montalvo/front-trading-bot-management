import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Strategy } from '../models/strategy.model';

@Injectable({ providedIn: 'root' })
export class StrategyService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(environment.strategies);
  }

  getById(id: string): Observable<Strategy> {
    return this.http.get<Strategy>(`${environment.strategies}/${id}`);
  }

  create(body: Partial<Strategy>): Observable<Strategy> {
    return this.http.post<Strategy>(environment.strategies, body);
  }

  update(id: string, body: Partial<Strategy>): Observable<Strategy> {
    return this.http.put<Strategy>(`${environment.strategies}/${id}`, body);
  }

  activate(id: string): Observable<Strategy> {
    return this.http.post<Strategy>(`${environment.strategies}/${id}/activate`, {});
  }

  deactivate(id: string): Observable<Strategy> {
    return this.http.post<Strategy>(`${environment.strategies}/${id}/deactivate`, {});
  }
}
