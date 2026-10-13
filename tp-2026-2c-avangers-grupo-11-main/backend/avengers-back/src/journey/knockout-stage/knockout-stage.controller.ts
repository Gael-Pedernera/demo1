import { Controller, Get } from '@nestjs/common';
import { KnockoutStageService } from './knockout-stage.service';
import { KnockoutStageResponse } from './knockout-stage.interface';

@Controller('journey/knockout-stage')
export class KnockoutStageController {
  constructor(private readonly knockoutStageService: KnockoutStageService) {}

  @Get()
  async getKnockoutStage(): Promise<KnockoutStageResponse> {
    return this.knockoutStageService.getKnockoutStage();
  }
}