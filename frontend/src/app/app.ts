import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Challenge, ChallengeService, Status } from './challenge.service';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // toSignal subscribes to the HTTP call and gives the template a signal to read.
  protected readonly challenges = toSignal(inject(ChallengeService).getAll(), { initialValue: [] as Challenge[] });

  protected readonly columns: { status: Status; title: string }[] = [
    { status: 'OPEN', title: 'Open' },
    { status: 'IN_PROGRESS', title: 'In progress' },
    { status: 'SOLVED', title: 'Solved' },
  ];

  // computed re-runs only when the challenges signal changes.
  protected readonly score = computed(() =>
    this.challenges()
      .filter((c) => c.status === 'SOLVED')
      .reduce((sum, c) => sum + c.points, 0),
  );

  protected inColumn(status: Status): Challenge[] {
    return this.challenges().filter((c) => c.status === status);
  }
}
