import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupStageService } from './group-stage.service';

@ApiTags('group-stage')
@Controller('journey/group-stage')
export class GroupStageController {
  constructor(private readonly groupstageService: GroupStageService) {}

  // TODO: Add the feature endpoints during the student implementation.
}
