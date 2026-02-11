import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HasPermissions } from "./directives/has-permissions";
import { Example } from './interfaces/example';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [
    HasPermissions,
    NgClass,
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private _authService = inject(AuthService);
  protected permissions = this._authService.permissions;
  protected examples = signal<Example[]>([
    {
      title: 'PERMISSION_1',
      rules: 'PERMISSION_1'
    },
    {
      title: 'PERMISSION_1 && PERMISSION_2',
      rules: {
        and: [
          'PERMISSION_1',
          'PERMISSION_2'
        ]
      }
    },
    {
      title: 'PERMISSION_1 || PERMISSION_2',
      rules: {
        or: [
          'PERMISSION_1',
          'PERMISSION_2'
        ]
      }
    },
    {
      title: 'PERMISSION_1 && (PERMISSION_2 || PERMISSION_3)',
      rules: {
        and: [
          'PERMISSION_1',
          {
            or: [
              'PERMISSION_2',
              'PERMISSION_3'
            ]
          }
        ]
      }
    },
    {
      title: 'PERMISSION_1 || (PERMISSION_2 && PERMISSION_3)',
      rules: {
        or: [
          'PERMISSION_1',
          {
            and: [
              'PERMISSION_2',
              'PERMISSION_3'
            ]
          }
        ]
      },
    }
  ]).asReadonly();


  public updatePermission(permission: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this._authService.changePermission(permission, checkbox.checked);
  }
}
