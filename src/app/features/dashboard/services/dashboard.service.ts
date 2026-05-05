import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  getSummary(botId: string): Observable<unknown> {
    const params = new HttpParams().set('bot_id', botId);
    return this.http.get(environment.dashboardSummary, { params });
  }

  getPnl(): Observable<unknown> {
    return this.http.get(environment.metricsPnl);
  }

  getPerformance(): Observable<unknown> {
    return this.http.get(environment.metricsPerformance);
  }
}
