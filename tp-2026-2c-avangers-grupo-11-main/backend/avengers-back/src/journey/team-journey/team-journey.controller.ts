import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeamJourneyService } from './team-journey.service';

@ApiTags('team-journey')
@Controller('journey/team')
export class TeamJourneyController {
  constructor(private readonly teamjourneyService: TeamJourneyService) {}

  // TODO: Add the feature endpoints during the student implementation.
}
