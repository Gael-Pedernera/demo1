import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { KnockoutRound, KnockoutStageResponse } from '../knockout-stage.models';

@Injectable({ providedIn: 'root' })
export class KnockoutStageService {
  private readonly apiUrl = 'http://localhost:4102/gameCore/journey/knockout-stage';

  private readonly loadingSubject = new BehaviorSubject<boolean>(true);

  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  private readonly errorCodeSubject = new BehaviorSubject<string | null>(null);

  private readonly roundsSubject = new BehaviorSubject<KnockoutRound[]>([]);

  readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();

  readonly error$: Observable<string | null> = this.errorSubject.asObservable();

  readonly errorCode$: Observable<string | null> = this.errorCodeSubject.asObservable();

  readonly rounds$: Observable<KnockoutRound[]> = this.roundsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  initialize(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.errorCodeSubject.next(null);

    this.http.get<KnockoutStageResponse>(this.apiUrl).subscribe({
      next: (data) => {
        this.loadingSubject.next(false);
        if (data && data.isAvailable) {
          this.roundsSubject.next(data.rounds || []);
        } else {
          this.roundsSubject.next([]);
        }
      },
      error: (err) => {
        this.loadingSubject.next(false);
        const code = err?.error?.responseMessage?.messageCode || 'FETCH_ERROR';
        const message = err?.error?.responseMessage?.message || 'Error al conectar con el servidor.';
        this.errorCodeSubject.next(code);
        this.errorSubject.next(message);
      },
    });
  }
}