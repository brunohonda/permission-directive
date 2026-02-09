import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mock } from '@vitest/spy';
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

describe.only(HasPermissions.name, () => {
  let fixture: ComponentFixture<MockComponent>;
  let component: MockComponent;
  let hasPermissionsSpy: Mock<(permission: BooleanExpression) => boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockComponent],
    }).compileComponents();

    const authService = TestBed.inject(AuthService);
    hasPermissionsSpy = vi.spyOn(authService, 'hasPermissions');

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create child', () => {
    hasPermissionsSpy.mockReturnValue(true);
    fixture.componentRef.setInput('permissions', 'PERMISSION_1');
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('p');
    expect(content).not.toBeNull();
  });

  it.only('should not create child', () => {
    hasPermissionsSpy.mockReturnValue(false);
    fixture.componentRef.setInput('permissions', 'PERMISSION_2');
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('p');
    expect(content).toBeNull();
  });
});
