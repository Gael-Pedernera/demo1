import { Component, OnInit } from '@angular/core';
import { TeamJourneyService } from './service/team-journey.service';

@Component({
  selector: 'app-team-journey',
  templateUrl: './team-journey.component.html',
  styleUrls: ['./team-journey.component.css'],
  standalone: false,
})
export class TeamJourneyComponent implements OnInit {
  constructor(private readonly teamjourneyService: TeamJourneyService) {}

  ngOnInit(): void {
    this.teamjourneyService.initialize();
  }
}
