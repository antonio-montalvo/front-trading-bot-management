import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Bot } from '../models/bot.model';

@Injectable({ providedIn: 'root' })
export class BotService {
  private readonly baseUrl = `${environment.apiUrl}/bot`;

  constructor(private readonly http: HttpClient) {}

  startBot(botId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/start?bot_id=${botId}`, {});
  }

  stopBot(botId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/stop?bot_id=${botId}`, {});
  }

  deleteBot(botId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${botId}`);
  }

  getStatus(botId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/status?bot_id=${botId}`);
  }
}
