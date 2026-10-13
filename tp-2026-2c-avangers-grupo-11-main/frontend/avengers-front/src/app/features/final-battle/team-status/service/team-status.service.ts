import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TeamProfile {
  id: string;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TeamStatusService {
  private readonly apiUrl = 'http://localhost:4102/gameCore/final-stage/status';

  constructor(private readonly http: HttpClient) {}

  getTeamStatus(): Observable<TeamProfile> {
    return this.http.get<TeamProfile>(this.apiUrl);
  }
}