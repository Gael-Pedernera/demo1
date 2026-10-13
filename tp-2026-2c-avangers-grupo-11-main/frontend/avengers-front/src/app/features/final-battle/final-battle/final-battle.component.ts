import { Component, OnInit } from '@angular/core';
import { FinalBattleService } from './service/final-battle.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-final-battle',
  templateUrl: './final-battle.component.html',
  styleUrls: ['./final-battle.component.css'],
  standalone: false,
})
export class FinalBattleComponent implements OnInit {
  constructor(
    private readonly finalbattleService: FinalBattleService,
    readonly i18n: I18nService,
  ) {}

  ngOnInit(): void {
    this.finalbattleService.initialize();
  }
}
