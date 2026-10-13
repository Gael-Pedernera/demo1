import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import {
  KnockoutStageResponse,
  KnockoutRound,
  KnockoutMatch,
  GameApiStagesEnvelope,
  GameApiKnockoutRound,
  GameApiKnockoutMatch,
} from './knockout-stage.interface';

@Injectable()
export class KnockoutStageService {
  private readonly gameApiBaseUrl: string;

  private readonly gameApiBasePath: string;

  private readonly teamId: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.gameApiBaseUrl = this.configService.get<string>(
      'GAME_API_URL',
      'http://localhost:5102',
    );
    this.gameApiBasePath = this.configService.get<string>(
      'GAME_API_BASE_PATH',
      '/game',
    );
    this.teamId = this.configService.get<string>('TEAM_ID', 'wasp');
  }

  async getKnockoutStage(): Promise<KnockoutStageResponse> {
    try {
      const stagesUrl = `${this.gameApiBaseUrl}${this.gameApiBasePath}/teams/${this.teamId}/journeys/current/stages`;
      const stagesRes = await firstValueFrom(
        this.httpService.get<GameApiStagesEnvelope>(stagesUrl),
      );

      const rawRounds: GameApiKnockoutRound[] =
        stagesRes.data?.data?.knockout?.rounds || [];

      if (!rawRounds || rawRounds.length === 0) {
        return { isAvailable: false, rounds: [] };
      }

      const stageNameMap: Record<string, string> = {
        ROUND_OF_16: 'Octavos de Final',
        QUARTERFINAL: 'Cuartos de Final',
        SEMIFINAL: 'Semifinales',
        FINAL_STAGE: 'Final',
      };

      const rounds: KnockoutRound[] = rawRounds.map(
        (r: GameApiKnockoutRound) => {
          const matches: KnockoutMatch[] = (r.matches || []).map(
            (m: GameApiKnockoutMatch) => ({
              encounterId: m.encounterId,
              stageId: r.stageCode,
              homeTeamName: m.teamAId,
              awayTeamName: m.teamBId,
              winnerTeamName: m.winnerTeamId || undefined,
              isCompleted: Boolean(m.winnerTeamId),
            }),
          );

          return {
            roundId: r.stageCode,
            name: stageNameMap[r.stageCode] || r.stageCode,
            matches,
          };
        },
      );

      return {
        isAvailable: true,
        rounds,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const responseData = error.response?.data as
          | { responseMessage?: { message?: string; messageCode?: string } }
          | undefined;

        const message = responseData?.responseMessage?.message || '';

        if (
          status === 404 ||
          status === 400 ||
          message.includes('No current Journey')
        ) {
          return { isAvailable: false, rounds: [] };
        }

        const statusCode = status || HttpStatus.INTERNAL_SERVER_ERROR;
        throw new HttpException(
          message || 'Error al obtener la fase eliminatoria',
          statusCode,
        );
      }

      throw new HttpException(
        'Error inesperado al consultar Game API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}