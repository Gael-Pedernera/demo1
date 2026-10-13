export interface HistoryItemApi {
  attemptId: string;
  status: string;
  createdAt: string;
  completedAt: string;
  spendingStrategyCode: string;
  outcomeCode: string;
  endingCode: string;
  terminalReasonCode: string;
  opponentFinalistId: string;
  opponentFinalistName: string;
  endingSummary: string;
}

export interface TeamHistoryApi {
  teamId: string;
  language: string;
  items: HistoryItemApi[];
}
