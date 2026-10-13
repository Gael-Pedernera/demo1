import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FinalBattleService } from './final-battle.service';

@ApiTags('final-battle')
@Controller('final-stage')
export class FinalBattleController {
  constructor(private readonly finalbattleService: FinalBattleService) {}

  // TODO: Add the feature endpoints during the student implementation.
}
