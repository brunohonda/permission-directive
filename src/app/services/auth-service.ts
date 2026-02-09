import { Injectable } from '@angular/core';
import { BooleanExpression } from '../types/boolean-expression';


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
    return this._permissions.get(permission) ?? false;
  }
}
