import { HeroApi, RelationshipApi } from '../../../basic/model/game-api/hero-catalog.model';

export interface TeamConfigItemModel extends HeroApi {
  selected: boolean;
  leader: boolean;
  active: boolean;
}

export interface TeamConfigModel {
  configuredTeamId: string;
  configuredHeroIds: string[];
  heroes: TeamConfigItemModel[];
  totalHeroes: number;
  visibleHeroes: number;
  appliedFilters: { searchTerm: string; role: string };
  configuredRelationships: RelationshipApi[];
  roleCoverage: Record<string, number>;
}
