import { Component, OnInit } from '@angular/core';
import { TeamProfile, TeamStatusService } from './service/team-status.service';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css'],
  standalone: false,
})
export class TeamStatusComponent implements OnInit {
  teamStatus?: TeamProfile;

  errorMessage?: string;

  constructor(private readonly teamstatusService: TeamStatusService) {}

  ngOnInit(): void {
    this.teamstatusService.getTeamStatus().subscribe({
      next: (data) => (this.teamStatus = data),
      error: () =>
        (this.errorMessage = 'No se pudo cargar el estado del equipo.'),
    });
  }
}