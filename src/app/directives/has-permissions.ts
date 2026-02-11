import { computed, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { BooleanExpression } from '../types/boolean-expression';

@Directive({
  selector: '[appHasPermissions]',
  standalone: true,
})
export class HasPermissions {
  private readonly authService = inject(AuthService);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);

  rules = input.required<BooleanExpression>({
    alias: 'appHasPermissions',
  });

  private readonly hasPermission = computed(() =>
    this.authService.hasPermissions(this.rules())()
  );

  constructor() {
    effect(() => {
      this.viewContainer.clear();

      if (this.hasPermission()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
