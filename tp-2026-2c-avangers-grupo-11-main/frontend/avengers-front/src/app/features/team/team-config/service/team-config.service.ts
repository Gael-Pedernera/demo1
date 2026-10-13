import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { HeroRosterApi } from '../../hero-roster/model/hero-roster-api.interface';
import { TeamConfigApi } from '../model/team-config-api.interface';

@Injectable({ providedIn: 'root' })
export class TeamConfigService extends BaseApiService {
  constructor(api: ApiService) {
    super(api);
  }

  initialize(): void {
    // TODO: Implement the team-config feature as part of the student project.
  }

  getConfiguration(): Observable<TeamConfigApi> {
    return this.getData<TeamConfigApi>('/my-team/configuration');
  }

  getHeroes(): Observable<HeroRosterApi> {
    return this.getData<HeroRosterApi>('/my-team/heroes', { searchTerm: '', role: 'ALL' });
  }
}
