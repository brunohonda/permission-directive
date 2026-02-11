import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [
    NgClass,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private _authService = inject(AuthService);
  protected permissions = this._authService.permissions;

  public updatePermission(permission: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this._authService.changePermission(permission, checkbox.checked);
  }
}
