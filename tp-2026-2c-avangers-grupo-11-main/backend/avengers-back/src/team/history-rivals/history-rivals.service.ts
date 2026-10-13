import { Injectable } from '@nestjs/common';
import { GameFeatureApiService } from '../../basic/game-feature-api.service';

@Injectable()
export class HistoryRivalsService {
  constructor(
    private readonly gameApi: GameFeatureApiService,
  ) {}

  async getHistoryRivals() {
    return await this.gameApi.heroes('es');
  }
}
