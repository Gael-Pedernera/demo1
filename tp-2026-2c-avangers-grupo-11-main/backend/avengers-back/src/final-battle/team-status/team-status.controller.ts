import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamStatusService } from './team-status.service';

@ApiTags('team-status')
@Controller('final-stage/status')
export class TeamStatusController {
  constructor(private readonly teamstatusService: TeamStatusService) {}

  @Get()
  @ApiOperation({ summary: 'Read the Team status from the Game API.' })
  @ApiOkResponse({ description: 'Team status.' })
  getTeamStatus() {
    return this.teamstatusService.getTeamStatus();
  }
}