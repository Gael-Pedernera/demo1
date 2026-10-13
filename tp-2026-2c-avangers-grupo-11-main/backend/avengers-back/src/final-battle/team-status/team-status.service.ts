import { BadGatewayException, Injectable } from '@nestjs/common';

interface GameApiResponse<T> {
  serverTime: string;
  success: boolean;
  responseMessage: { messageCode: string; message: string };
  data: T | null;
}

export interface TeamProfile {
  id: string;
  name: string;
  description: string;
}

const GAME_API_URL = process.env.GAME_API_URL ?? 'http://127.0.0.1:5102/game';
const TEAM_ID = 'wasp';

@Injectable()
export class TeamStatusService {
  async getTeamStatus(): Promise<TeamProfile> {
    const res = await fetch(
      `${GAME_API_URL}/teams/${TEAM_ID}/profile?lang=es`,
    );
    const body = (await res.json()) as GameApiResponse<TeamProfile>;

    if (!res.ok || !body.success || !body.data) {
      throw new BadGatewayException(
        body?.responseMessage?.message ?? `Game API respondió ${res.status}`,
      );
    }
    return body.data;
  }
}