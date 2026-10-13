import { CombatStrategy } from './team-configuration.model';

export interface FinalHeroApi {
  id: string;
  displayName: string;
  eligibility: { code: string; label?: string; description?: string };
  stats: { power: number; agility: number; resistance: number; ability: number };
  resources: { maximumEnergy: number; maximumAbilityPoints: number };
  roles: {
    primary: { code: string; label?: string; description?: string };
    secondary: { code: string; label?: string; description?: string };
  };
  abilities: {
    basicAttack: FinalAbilityApi;
    offensiveSpecial: FinalAbilityApi;
    supportSpecial: FinalAbilityApi;
    leaderAbility: FinalAbilityApi | null;
  };
  leaderProfileCode: CombatStrategy | null;
  biography: string;
  tournamentMotivation: string;
}

export interface FinalAbilityApi {
  id: string;
  name: string;
  description: string;
  abilityPointCost?: number;
  effectCode?: string;
  targetScope: string;
}

export interface FinalHeroCatalogApi {
  language: string;
  count: number;
  heroes: FinalHeroApi[];
}

export interface FinalRelationshipApi {
  heroAId: string;
  heroBId: string;
  relationshipCode: 'ALLY' | 'NORMAL' | 'RIVAL';
}

export interface FinalRelationshipCatalogApi {
  heroIds: string[];
  relationships: FinalRelationshipApi[];
}

export interface FinalAssignedTeamApi {
  id: string;
  name: string;
  description: string;
  leaderId: string;
}

export interface FinalAssignedTeamCatalogApi {
  language: string;
  teams: FinalAssignedTeamApi[];
}

export interface FinalStrategyApi {
  code: CombatStrategy;
  label: string;
  description: string;
}

export interface FinalStrategyCatalogApi {
  language: string;
  strategies: FinalStrategyApi[];
  compatibility: Record<string, string>;
}

export interface FinalCurrentAttemptApi {
  attemptId: string;
  status: string;
  stageCount: number;
  encounterCount: number;
}

export interface FinalCurrentJourneyApi {
  teamId: string;
  attempt: FinalCurrentAttemptApi | null;
  summary: FinalJourneySummaryApi | null;
}

export interface FinalTeamConfigurationApi {
  leaderId: string;
  companionIds: string[];
  activeHeroIds: string[];
  inactiveHeroIds: string[];
  strategyCode: CombatStrategy;
}

export interface FinalTeamConfigurationDataApi {
  teamId: string;
  configured: boolean;
  configuration: FinalTeamConfigurationApi | null;
  currentAttempt: FinalCurrentAttemptApi | null;
  editability: { members: boolean; formation: boolean; strategy: boolean };
}

export interface FinalSaveConfigurationApi {
  teamId: string;
  configuration: FinalTeamConfigurationApi;
  journeyReplaced: boolean;
  currentAttempt: FinalCurrentAttemptApi | null;
}

export interface FinalSimulateJourneyApi {
  attemptId: string;
  teamId: string;
  status: string;
  spendingStrategyCode: 'SAVE' | 'BALANCED' | 'AGGRESSIVE';
  playerQualified: boolean;
  finalists: { playerTeamId: string; opponentTeamId: string };
  summary: {
    stagesCompleted: number;
    encountersSimulated: number;
    playerRewardPointsRemaining: number;
  };
  replacedPrevious: boolean;
}

export interface FinalJourneySummaryApi {
  attemptId: string;
  teamId: string;
  status: string;
  spendingStrategyCode: 'SAVE' | 'BALANCED' | 'AGGRESSIVE';
  configuration: FinalTeamConfigurationApi;
  finalists: { playerTeamId: string; opponentTeamId: string };
  completionOutcome?: 'VICTORY' | 'DEFEAT' | 'ABANDON' | null;
  endingCode?: string | null;
  terminalReasonCode?: string | null;
  createdAt: string;
  completedAt: string | null;
  progress: { stagesCompleted: number; encountersPlayedByPlayer: number; finalStageStatus: string };
}

export interface FinalHistoryItemApi {
  attemptId: string;
  status: 'COMPLETED';
  createdAt: string;
  completedAt: string;
  spendingStrategyCode: 'SAVE' | 'BALANCED' | 'AGGRESSIVE';
  outcomeCode: string;
  opponentFinalistId: string;
  opponentFinalistName: string;
  endingCode: string;
  terminalReasonCode: string | null;
  endingSummary: string;
}

export interface FinalHistoryApi {
  teamId: string;
  language: string;
  items: FinalHistoryItemApi[];
}

export interface FinalJourneyTeamsApi {
  attemptId: string;
  teams: FinalJourneyTeamApi[];
  finalists: { playerTeamId: string; opponentTeamId: string };
}

export interface FinalJourneyTeamApi {
  teamId: string;
  name: string;
  leaderId: string;
  heroIds: string[];
  strategyCode: string;
  heroes?: Array<{
    heroId: string;
    currentEnergy: number;
    currentAbilityPoints: number;
    status: string;
    knockedOut: boolean;
  }>;
}
