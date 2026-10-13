import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LiveEventsService } from './live-events.service';

@ApiTags('live-events')
@Controller('final-stage/events')
export class LiveEventsController {
  constructor(private readonly liveeventsService: LiveEventsService) {}

  // TODO: Add the feature endpoints during the student implementation.
}
