import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
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
    const updatedPermissions = new Map(this._permissions());
    updatedPermissions.set(permission, value);

    this._permissions.set(updatedPermissions);
  }

  public hasPermissions (rules: BooleanExpression): Signal<boolean> {
    return computed(() => this._evaluate(rules));
  };

  private _evaluate(permission: BooleanExpression): boolean {
    if (typeof permission === 'string') {
      return this._permissions().get(permission) ?? false;
    }

    if (permission.and) {
      return permission.and.every(expr =>
        typeof expr === 'string'
          ? this._permissions().get(expr) ?? false
          : this._evaluate(expr)
      );
    }

    if (permission.or) {
      return permission.or.some(expr =>
        typeof expr === 'string'
          ? this._permissions().get(expr) ?? false
          : this._evaluate(expr)
      );
    }

    return false;
  }
}
