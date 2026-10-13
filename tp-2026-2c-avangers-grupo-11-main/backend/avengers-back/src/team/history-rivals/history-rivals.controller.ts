import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HistoryRivalsService } from './history-rivals.service';
import { AbstractController } from '../../basic/abstract.controller';

@ApiTags('history-rivals')
@Controller('my-team/history-rivals')
export class HistoryRivalsController extends AbstractController {
  constructor(
    private readonly historyrivalsService: HistoryRivalsService
  ) {
    super();
  }

  // TODO: Add the feature endpoints during the student implementation.
@Get()
  async getHistoryRivals() {
    const data = await this.historyrivalsService.getHistoryRivals();
    return this.createOkResponse(data);
  }
}
