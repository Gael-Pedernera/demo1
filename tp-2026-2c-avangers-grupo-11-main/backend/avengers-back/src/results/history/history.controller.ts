import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../../basic/abstract.controller';
import { ResponseObject } from '../../basic/response-object.interface';
import { HistoryService } from './history.service';
import { HistoryModel } from './model/history.model';

@ApiTags('history')
@Controller('results/history')
export class HistoryController extends AbstractController {
  constructor(private readonly historyService: HistoryService) {
    super();
  }

  @Get()
  @ApiOperation({
    summary: 'List the completed Journeys of the configured Team.',
  })
  async getHistory(): Promise<ResponseObject<HistoryModel>> {
    return this.createOkResponse(await this.historyService.getHistory());
  }
}
