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