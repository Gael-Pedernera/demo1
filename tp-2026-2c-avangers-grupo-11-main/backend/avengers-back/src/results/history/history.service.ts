import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorCode } from '../../basic/error/error-code.enum';
import { ApiErrorMappingRule, ApiErrorStatusMap, ErrorUtils } from '../../basic/error/error.utils';
import { GameFeatureApiService } from '../../basic/game-feature-api.service';
import { ApplicationContextService } from '../../basic/services/application-context.service';
import { HistoryModel } from './model/history.model';

const HISTORY_API_ERROR_STATUS_MAP: ApiErrorStatusMap = {
  [HttpStatus.NOT_FOUND]: {
    messageCode: ErrorCode.HISTORY_UNAVAILABLE,
    message: 'Journey history is not available right now.',
  },
  [HttpStatus.CONFLICT]: {
    messageCode: ErrorCode.HISTORY_UNAVAILABLE,
    message: 'Journey history is not available right now.',
  },
};

const HISTORY_API_ERROR_FALLBACK: ApiErrorMappingRule = {
  messageCode: ErrorCode.HISTORY_UNAVAILABLE,
  message: 'Unable to load the Journey history right now.',
};

@Injectable()
export class HistoryService {
  constructor(
    private readonly context: ApplicationContextService,
    private readonly game: GameFeatureApiService,
  ) {}

  async getHistory(): Promise<HistoryModel> {
    const teamId = this.context.getCurrentTeamId();
    const language = this.context.language;

    try {
      const history = await this.game.history(teamId, language);
      return {
        teamId: history.teamId,
        language: history.language,
        items: history.items.map((item) => ({
          attemptId: item.attemptId,
          status: item.status,
          createdAt: item.createdAt,
          completedAt: item.completedAt,
          spendingStrategyCode: item.spendingStrategyCode,
          outcomeCode: item.outcomeCode,
          endingCode: item.endingCode,
          terminalReasonCode: item.terminalReasonCode,
          opponentFinalistId: item.opponentFinalistId,
          opponentFinalistName: item.opponentFinalistName,
          endingSummary: item.endingSummary,
        })),
      };
    } catch (error) {
      ErrorUtils.mapGameApiError(error, HISTORY_API_ERROR_STATUS_MAP, HISTORY_API_ERROR_FALLBACK);
    }
  }
}
