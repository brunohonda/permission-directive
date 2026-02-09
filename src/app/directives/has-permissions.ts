import { Directive, effect, inject, input, InputSignal, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { BooleanExpression } from '../types/boolean-expression';

@Directive({
  selector: '[appHasPermissions]',
  standalone: true,
})
export class HasPermissions {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  private _authService = inject(AuthService);
    
  permissions: InputSignal<BooleanExpression> = input.required({
    alias: 'appHasPermissions',
  });

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      const permissions = this.permissions();

      if (this._authService.hasPermissions(permissions)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
