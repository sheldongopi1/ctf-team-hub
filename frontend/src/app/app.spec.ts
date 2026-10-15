import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('puts challenges in their column and counts only solved points', async () => {
    const fixture = TestBed.createComponent(App);
    const http = TestBed.inject(HttpTestingController);

    http.expectOne('/api/challenges').flush([
      { name: 'Cookie Monster', category: 'WEB', points: 100, status: 'SOLVED', assignee: 'Sheldon' },
      { name: 'Baby RSA', category: 'CRYPTO', points: 200, status: 'IN_PROGRESS', assignee: 'Sheldon' },
      { name: 'Stack Smash', category: 'PWN', points: 300, status: 'OPEN', assignee: null },
    ]);
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    const columns = [...el.querySelectorAll('section')].map((s) => s.textContent ?? '');
    expect(columns[0]).toContain('Stack Smash');
    expect(columns[0]).toContain('nobody yet');
    expect(columns[1]).toContain('Baby RSA');
    expect(columns[2]).toContain('Cookie Monster');
    expect(el.querySelector('.score')?.textContent).toContain('100');
    http.verify();
  });
});
