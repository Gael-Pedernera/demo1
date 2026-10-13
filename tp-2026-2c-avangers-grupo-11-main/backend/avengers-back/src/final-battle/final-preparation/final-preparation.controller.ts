import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FinalPreparationService } from './final-preparation.service';

@ApiTags('final-preparation')
@Controller('final-stage/preparation')
export class FinalPreparationController {
  constructor(private readonly finalpreparationService: FinalPreparationService) {}

  // TODO: Add the feature endpoints during the student implementation.
}
