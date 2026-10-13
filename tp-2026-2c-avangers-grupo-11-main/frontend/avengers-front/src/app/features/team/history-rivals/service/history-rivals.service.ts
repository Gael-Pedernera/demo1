import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { toApiError } from '../../../../core/models/api-error.interface';

interface HeroIdentity {
  id: string;
  displayName: string;
}

interface HistoryRivalsApi {
  count: number;
  heroes: HeroIdentity[];
}

@Injectable({ providedIn: 'root' })
export class HistoryRivalsService extends BaseApiService {
  data: HistoryRivalsApi | null = null;
  error: string | null = null;

  constructor(api: ApiService) {
    super(api);
  }

  initialize(): void {
    this.data = null;
    this.error = null;

    this.getData<HistoryRivalsApi>('/my-team/history-rivals')
      .subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (error: unknown) => {
          this.error = toApiError(error).message;
        },
      });
  }
}
