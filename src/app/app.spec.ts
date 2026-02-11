import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './services/auth-service';

describe(App.name, () => {
  let authService : AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('should render permissions', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('input[type="checkbox"]')?.length).toBe(authService.permissions().size);
  });
});
