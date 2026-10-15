import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export type Category = 'WEB' | 'CRYPTO' | 'PWN' | 'REVERSING' | 'FORENSICS' | 'MISC';
export type Status = 'OPEN' | 'IN_PROGRESS' | 'SOLVED';

/** One CTF challenge, as the Spring Boot API returns it. */
export interface Challenge {
  name: string;
  category: Category;
  points: number;
  status: Status;
  assignee: string | null;
}

/** Talks to the backend. During `ng serve` the dev proxy forwards /api to Spring Boot. */
@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>('/api/challenges');
  }
}
