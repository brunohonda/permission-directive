import { Component, input, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth-service';
import { BooleanExpression } from '../types/boolean-expression';
import { HasPermissions } from './has-permissions';


@Component({
  standalone: true,
  imports: [HasPermissions],
  template: `
    <div *appHasPermissions="permissions()">
      <p>Hello World</p>
    </div>
  `
})
class MockComponent {
  permissions = input<BooleanExpression>('PERMISSION_1');
}

describe(HasPermissions.name, () => {
  const authServiceMock = {
    hasPermissions: vi.fn(),
  };

  let fixture: ComponentFixture<MockComponent>;
  let component: MockComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ]
    }).compileComponents();

    const authService = TestBed.inject(AuthService);
    vi.spyOn(authService, 'hasPermissions')

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  });

  test('should create child', () => {
    authServiceMock.hasPermissions.mockReturnValue(signal(true));
    fixture.componentRef.setInput('permissions', 'PERMISSION_1');
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('p');
    expect(content).not.toBeNull();
  });

  test('should not create child', () => {
    authServiceMock.hasPermissions.mockReturnValue(signal(false));
    fixture.componentRef.setInput('permissions', 'PERMISSION_1');
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('p');
    expect(content).toBeNull();
  });

  test('should create child and destroy when rules change', () => {
    authServiceMock.hasPermissions.mockReturnValue(signal(true));
    fixture.componentRef.setInput('permissions', 'PERMISSION_1');
    fixture.detectChanges();

    const contentBefore = fixture.nativeElement.querySelector('p');
    expect(contentBefore).not.toBeNull();
    
    authServiceMock.hasPermissions.mockReturnValue(signal(false));
    fixture.componentRef.setInput('permissions', 'PERMISSION_2');
    fixture.detectChanges();

    const contentAfter = fixture.nativeElement.querySelector('p');
    expect(contentAfter).toBeNull();
  });

  test('should create child and destroy when permissions change', () => {
    const permissionSignalMock = signal(true);
    authServiceMock.hasPermissions.mockReturnValue(permissionSignalMock);
    fixture.componentRef.setInput('permissions', 'PERMISSION_1');
    fixture.detectChanges();

    const contentBefore = fixture.nativeElement.querySelector('p');
    expect(contentBefore).not.toBeNull();

    permissionSignalMock.set(false);
    fixture.detectChanges();

    const contentAfter = fixture.nativeElement.querySelector('p');
    expect(contentAfter).toBeNull();
  });
});
