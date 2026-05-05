import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface AccountResponse {
  id: string;
  equity: string;
  cash: string;
  buying_power: string;
  portfolio_value: string;
  currency: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class BrokerService {
  constructor(private readonly http: HttpClient) {}

  getAccount(): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(environment.brokerAccount);
  }

  getPositions(): Observable<unknown[]> {
    return this.http.get<unknown[]>(environment.brokerPositions);
  }

  getOrders(): Observable<unknown[]> {
    return this.http.get<unknown[]>(environment.brokerOrders);
  }
}
