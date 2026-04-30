import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Bot } from '../models/bot.model';

@Injectable({ providedIn: 'root' })
export class BotService {
  private readonly baseUrl = `${environment.apiUrl}/bots`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Bot[]> {
    return this.http.get<Bot[]>(this.baseUrl);
  }

  getById(id: string): Observable<Bot> {
    return this.http.get<Bot>(`${this.baseUrl}/${id}`);
  }
}
