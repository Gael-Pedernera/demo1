import { Component, OnInit } from '@angular/core';
import { GroupStageService } from './service/group-stage.service';

@Component({
  selector: 'app-group-stage',
  templateUrl: './group-stage.component.html',
  styleUrls: ['./group-stage.component.css'],
  standalone: false,
})
export class GroupStageComponent implements OnInit {
  constructor(private readonly groupstageService: GroupStageService) {}

  ngOnInit(): void {
    this.groupstageService.initialize();
  }
}
