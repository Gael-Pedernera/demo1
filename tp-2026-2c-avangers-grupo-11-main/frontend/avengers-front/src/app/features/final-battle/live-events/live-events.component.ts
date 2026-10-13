import { Component, OnInit } from '@angular/core';
import { LiveEventsService } from './service/live-events.service';

@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.css'],
  standalone: false,
})
export class LiveEventsComponent implements OnInit {
  constructor(private readonly liveeventsService: LiveEventsService) {}

  ngOnInit(): void {
    this.liveeventsService.initialize();
  }
}
