import { Component, OnInit } from '@angular/core';
import { forkJoin, finalize } from 'rxjs';
import { toApiError } from '../../../core/models/api-error.interface';
import { HeroArtworkResolverService } from '../../../core/services/hero-artwork-resolver.service';
import { RosterHero } from '../hero-roster/model/hero-roster-api.interface';
import { TeamConfigService } from './service/team-config.service';

@Component({
  selector: 'app-team-config',
  templateUrl: './team-config.component.html',
  styleUrls: ['./team-config.component.css'],
  standalone: false,
})
export class TeamConfigComponent implements OnInit {
  constructor(
    private readonly teamconfigService: TeamConfigService,
    private readonly artwork: HeroArtworkResolverService,
  ) {}

  isLoading = false;

  testResult: string | null = null;

  testError: string | null = null;

  configuredHeroIds: string[] = [];

  configuredHeroes: RosterHero[] = [];

  leader: RosterHero | null = null;

  ngOnInit(): void {
    this.teamconfigService.initialize();
    this.testBffCall();
  }

  testBffCall(): void {
    this.isLoading = true;
    this.testResult = null;
    this.testError = null;

    forkJoin({
      configuration: this.teamconfigService.getConfiguration(),
      roster: this.teamconfigService.getHeroes(),
    })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: ({ configuration, roster }) => {
          this.configuredHeroIds = configuration.configuredHeroIds;
          const heroesById = new Map(roster.heroes.map((hero) => [hero.id, hero]));
          this.configuredHeroes = configuration.configuredHeroIds
            .map((heroId) => heroesById.get(heroId))
            .filter((hero): hero is RosterHero => hero !== undefined);
          this.leader = roster.heroes.find((hero) => hero.leader) ?? null;
        },
        error: (error: unknown) => {
          this.testError = toApiError(error).message;
        },
      });
  }

  portraitPath(hero: RosterHero): string {
    return this.artwork.portraitPath(hero.id);
  }

  loaderPath(): string {
    return this.artwork.loaderPath();
  }

  imageError(event: Event): void {
    this.artwork.useFallback(event);
  }
}
