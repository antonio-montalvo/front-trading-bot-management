import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { 
  Strategy, 
  StrategyParameter, 
  StrategyWithParameters,
  StrategyCreateRequest,
  StrategyParameterCreateRequest 
} from '../models/strategy.model';

@Injectable({ providedIn: 'root' })
export class StrategyService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(`${environment.apiUrl}/strategy/strategies`);
  }

  getById(id: string): Observable<StrategyWithParameters> {
    return this.http.get<StrategyWithParameters>(`${environment.apiUrl}/strategy/${id}`);
  }

  getByBotId(botId: string): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(`${environment.apiUrl}/strategy/bot/${botId}`);
  }

  create(body: StrategyCreateRequest): Observable<Strategy> {
    return this.http.post<Strategy>(`${environment.apiUrl}/strategy/create`, body);
  }

  update(id: string, body: Partial<Strategy>): Observable<Strategy> {
    return this.http.put<Strategy>(`${environment.apiUrl}/strategy/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/strategy/${id}`);
  }

  activate(id: string): Observable<Strategy> {
    return this.http.post<Strategy>(`${environment.apiUrl}/strategy/${id}/activate`, {});
  }

  deactivate(id: string): Observable<Strategy> {
    return this.http.post<Strategy>(`${environment.apiUrl}/strategy/${id}/deactivate`, {});
  }

  getParameters(strategyId: string): Observable<StrategyParameter[]> {
    return this.http.get<StrategyParameter[]>(`${environment.apiUrl}/strategy/${strategyId}/parameters`);
  }

  createParameter(strategyId: string, body: StrategyParameterCreateRequest): Observable<StrategyParameter> {
    return this.http.post<StrategyParameter>(`${environment.apiUrl}/strategy/${strategyId}/parameters`, body);
  }

  updateParameter(strategyId: string, parameterId: string, body: Partial<StrategyParameterCreateRequest>): Observable<StrategyParameter> {
    return this.http.put<StrategyParameter>(`${environment.apiUrl}/strategy/${strategyId}/parameters/${parameterId}`, body);
  }

  deleteParameter(strategyId: string, parameterId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/strategy/${strategyId}/parameters/${parameterId}`);
  }
}
