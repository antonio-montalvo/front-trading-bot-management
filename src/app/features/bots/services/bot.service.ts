import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Bot } from '../models/bot.model';

@Injectable({ providedIn: 'root' })
export class BotService {
  constructor(private readonly http: HttpClient) {}

  start(): Observable<unknown> {
    return this.http.post(environment.botStart, {});
  }

  stop(): Observable<unknown> {
    return this.http.post(environment.botStop, {});
  }

  getStatus(): Observable<unknown> {
    return this.http.get(environment.botStatus);
  }
}
