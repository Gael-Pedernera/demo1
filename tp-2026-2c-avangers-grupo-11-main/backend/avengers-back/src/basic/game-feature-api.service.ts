import { Injectable } from '@nestjs/common';
import { GameApiService } from './game-api.service';
import {
  FinalAssignedTeamCatalogApi,
  FinalCurrentJourneyApi,
  FinalJourneyTeamsApi,
  FinalHeroCatalogApi,
  FinalRelationshipCatalogApi,
  FinalSimulateJourneyApi,
  FinalTeamConfigurationDataApi,
} from './model/game-api/final-contract.model';
import { HeroCatalogApi, RelationshipCatalogApi } from './model/game-api/hero-catalog.model';
import { TeamHistoryApi } from './model/game-api/history.model';
import {
  CurrentJourneyApi,
  JourneySpendingStrategy,
  SimulateJourneyApi,
} from './model/game-api/journey.model';
import { TeamProfileApi } from './model/game-api/team-profile.model';
import { TeamConfigurationReadApi } from './model/game-api/team-configuration.model';

@Injectable()
export class GameFeatureApiService {
  constructor(private readonly api: GameApiService) {}

  profile(teamId: string, lang = 'en') {
    return this.api.get<TeamProfileApi>(`/teams/${teamId}/profile`, { lang });
  }

  async assignedTeams(lang = 'en') {
    const catalog = await this.api.get<FinalAssignedTeamCatalogApi>('/teams', { lang });
    return catalog.teams.map((team) => ({
      id: team.id,
      name: team.name,
      leaderId: team.leaderId,
    }));
  }

  async heroes(lang: string, _ids?: string[]) {
    const catalog = await this.api.get<FinalHeroCatalogApi>('/heroes', { lang });
    return {
      count: catalog.count,
      heroes: catalog.heroes.map((hero) => ({
        id: hero.id,
        displayName: hero.displayName,
        archetype: hero.roles.primary.code,
        eligibility: hero.eligibility.code as 'PREFERRED' | 'ELIGIBLE' | 'COMPANION_ONLY',
        stats: hero.stats,
        maxima: {
          energy: hero.resources.maximumEnergy,
          abilityPoints: hero.resources.maximumAbilityPoints,
        },
        roles: {
          primary: hero.roles.primary.code,
          secondary: hero.roles.secondary.code,
        },
        abilities: {
          offensive: this.ability(hero.abilities.offensiveSpecial),
          support: this.ability(hero.abilities.supportSpecial),
          leader: hero.abilities.leaderAbility ? this.ability(hero.abilities.leaderAbility) : null,
        },
        leaderProfile: hero.leaderProfileCode,
        biography: hero.biography,
        tournamentMotivation: hero.tournamentMotivation,
        allies: [],
        rivals: [],
      })),
    } satisfies HeroCatalogApi;
  }

  async relationships(_ids: string[]) {
    const catalog = await this.api.get<FinalRelationshipCatalogApi>('/heroes/relationships');
    return {
      heroIds: catalog.heroIds,
      relationships: catalog.relationships.map((relationship) => ({
        heroAId: relationship.heroAId,
        heroBId: relationship.heroBId,
        relationship: relationship.relationshipCode,
      })),
    } satisfies RelationshipCatalogApi;
  }

  async configuration(teamId: string) {
    const data = await this.api.get<FinalTeamConfigurationDataApi>(
      `/teams/${teamId}/configuration`,
    );
    return {
      teamId: data.teamId,
      configuration: data.configuration
        ? {
            leaderId: data.configuration.leaderId,
            companionIds: data.configuration.companionIds,
            activeHeroIds: data.configuration.activeHeroIds,
            strategy: data.configuration.strategyCode,
          }
        : null,
      currentAttempt: data.currentAttempt,
      editability: data.editability,
    } satisfies TeamConfigurationReadApi;
  }

  async currentJourney(teamId: string, lang: string) {
    const current = await this.api.get<FinalCurrentJourneyApi>(
      `/teams/${teamId}/journeys/current`,
      { lang },
    );
    const attempt = current.summary;
    return {
      teamId: current.teamId,
      summary: current.summary,
      attempt: current.attempt
        ? {
            id: current.attempt.attemptId,
            teamId: current.teamId,
            status: current.attempt.status,
            stageCount: current.attempt.stageCount,
            encounterCount: current.attempt.encounterCount,
            spendingStrategy: attempt?.spendingStrategyCode,
            finalistIds: attempt
              ? [attempt.finalists.playerTeamId, attempt.finalists.opponentTeamId]
              : [],
          }
        : null,
    } satisfies CurrentJourneyApi;
  }

  simulate(teamId: string, body: { spendingStrategy: JourneySpendingStrategy }) {
    return this.api
      .post<FinalSimulateJourneyApi>(`/teams/${teamId}/journeys/simulate`, {
        spendingStrategy: body.spendingStrategy,
      })
      .then(
        (result) =>
          ({
            attemptId: result.attemptId,
            teamId: result.teamId,
            status: result.status,
            spendingStrategy: result.spendingStrategyCode,
            opponentFinalistId: result.finalists.opponentTeamId,
            replacedPrevious: result.replacedPrevious,
          }) satisfies SimulateJourneyApi,
      );
  }

  history(teamId: string, lang: string) {
    return this.api.get<TeamHistoryApi>(`/teams/${teamId}/history`, { lang });
  }

  currentTeams(teamId: string) {
    return this.api.get<FinalJourneyTeamsApi>(`/teams/${teamId}/journeys/current/teams`);
  }

  private ability(ability: import('./model/game-api/final-contract.model').FinalAbilityApi) {
    return {
      id: ability.id,
      name: ability.name,
      description: ability.description,
      apCost: ability.abilityPointCost,
      effect: ability.effectCode,
      targetScope: ability.targetScope,
    };
  }
}
