import { Injectable, signal, WritableSignal } from '@angular/core';
import { BooleanExpression } from '../types/boolean-expression';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected _permissions: WritableSignal<Map<string, boolean>> = signal(
    new Map<string, boolean>([
      ['PERMISSION_1', false],
      ['PERMISSION_2', false],
      ['PERMISSION_3', false],
      ['PERMISSION_4', false],
      ['PERMISSION_5', false],
      ['PERMISSION_6', false],
    ])
  );

  public permissions = this._permissions.asReadonly();

  public changePermission(permission: string, value: boolean): void {
    this._permissions.update((permissions) => {
      permissions.set(permission, value);
      return permissions;
    });
  }

  public hasPermissions(permission: BooleanExpression): boolean {
    if (typeof permission === 'string') {
      return this._hasPermissionValue(permission);
    }

    if (permission.and) {
      return permission.and.every(expr =>
        typeof expr === 'string'
          ? this._hasPermissionValue(expr)
          : this.hasPermissions(expr)
      );
    }

    if (permission.or) {
      return permission.or.some(expr =>
        typeof expr === 'string'
          ? this._hasPermissionValue(expr)
          : this.hasPermissions(expr)
      );
    }

    // Segurança extra (não deveria acontecer)
    return false;
  }

  private _hasPermissionValue(permission: string): boolean {
    return this._permissions().get(permission) ?? false;
  }
}
