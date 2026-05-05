import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  getPnl(): Observable<unknown> {
    return this.http.get(environment.metricsPnl);
  }

  getPerformance(): Observable<unknown> {
    return this.http.get(environment.metricsPerformance);
  }
}
