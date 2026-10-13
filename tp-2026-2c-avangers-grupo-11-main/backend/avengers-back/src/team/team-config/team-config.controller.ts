import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../../basic/abstract.controller';
import { ResponseObject } from '../../basic/response-object.interface';
import { TeamConfigQueryRequest } from './request/team-config-query.request';
import { TeamConfigModel } from './model/team-config.model';
import { TeamConfigService } from './team-config.service';

@ApiTags('team-config')
@Controller('my-team/configuration')
export class TeamConfigController extends AbstractController {
  constructor(private readonly teamconfigService: TeamConfigService) {
    super();
  }

  // TODO: Add the feature endpoints during the student implementation.
  @Get('')
  @ApiOperation({
    summary: 'Search and filter the canonical Hero roster.',
  })
  async getTeamConfig(
    @Query() request: TeamConfigQueryRequest,
  ): Promise<ResponseObject<TeamConfigModel>> {
    return this.createOkResponse(await this.teamconfigService.getTeamConfig(request));
  }

  @Get('heroes')
  @ApiOperation({
    summary: 'Search and filter the canonical Hero roster.',
  })
  async getHeroes(
    @Query() request: TeamConfigQueryRequest,
  ): Promise<ResponseObject<TeamConfigModel>> {
    return this.createOkResponse(await this.teamconfigService.getHeroes(request));
  }
}
