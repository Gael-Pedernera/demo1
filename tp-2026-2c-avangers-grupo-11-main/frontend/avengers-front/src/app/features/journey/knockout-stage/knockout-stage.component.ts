import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KnockoutStageService } from './service/knockout-stage.service';
import { KnockoutRound } from './knockout-stage.models';

@Component({
  selector: 'app-knockout-stage',
  templateUrl: './knockout-stage.component.html',
  styleUrls: ['./knockout-stage.component.css'],
})
export class KnockoutStageComponent implements OnInit {
  readonly loading$: Observable<boolean> = this.knockoutService.loading$;

  readonly error$: Observable<string | null> = this.knockoutService.error$;

  readonly errorCode$: Observable<string | null> = this.knockoutService.errorCode$;

  readonly rounds$: Observable<KnockoutRound[]> = this.knockoutService.rounds$;

  constructor(private readonly knockoutService: KnockoutStageService) {}

  ngOnInit(): void {
    this.knockoutService.initialize();
  }

  retry(): void {
    this.knockoutService.initialize();
  }

  trackByRoundId(index: number, round: KnockoutRound): string {
    return round.roundId;
  }
}