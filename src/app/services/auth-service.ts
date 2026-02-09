import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected _permissions: Map<string, boolean> =  new Map<string, boolean>([
    ['PERMISSION_1', true],
    ['PERMISSION_2', false],
    ['PERMISSION_3', true],
    ['PERMISSION_4', false],
    ['PERMISSION_5', true],
    ['PERMISSION_6', false],
  ]);

  public hasPermissions(permission: string): boolean {
    return this._permissions.get(permission) ?? false;
  }
}
