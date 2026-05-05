import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Position } from '../models/position.model';

@Injectable({ providedIn: 'root' })
export class PositionService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(environment.brokerPositions);
  }
}
