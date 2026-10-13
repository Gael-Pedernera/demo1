export interface GameApiKnockoutMatch {
  slot: number;
  encounterId: string;
  teamAId: string;
  teamBId: string;
  winnerTeamId?: string;
  nextStageCode?: string;
  nextSlot?: number;
}

export interface GameApiKnockoutRound {
  stageCode: string;
  matches: GameApiKnockoutMatch[];
}

export interface GameApiKnockoutWrapper {
  rounds?: GameApiKnockoutRound[];
}

export interface GameApiStagesData {
  attemptId?: string;
  knockout?: GameApiKnockoutWrapper;
}

export interface GameApiStagesEnvelope {
  serverTime?: string;
  success?: boolean;
  data?: GameApiStagesData;
}

export interface KnockoutMatch {
  encounterId?: string;
  stageId: string;
  homeTeamName: string;
  awayTeamName: string;
  winnerTeamName?: string;
  isCompleted: boolean;
}

export interface KnockoutRound {
  roundId: string;
  name: string;
  matches: KnockoutMatch[];
}

export interface KnockoutStageResponse {
  isAvailable: boolean;
  rounds: KnockoutRound[];
}