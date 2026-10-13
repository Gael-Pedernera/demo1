import { Component, OnInit } from '@angular/core';
import { FinalPreparationService } from './service/final-preparation.service';

@Component({
  selector: 'app-final-preparation',
  templateUrl: './final-preparation.component.html',
  styleUrls: ['./final-preparation.component.css'],
  standalone: false,
})
export class FinalPreparationComponent implements OnInit {
  constructor(private readonly finalpreparationService: FinalPreparationService) {}

  ngOnInit(): void {
    this.finalpreparationService.initialize();
  }
}
