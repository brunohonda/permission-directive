import { TestBed } from '@angular/core/testing';

import { BooleanExpression } from '../types/boolean-expression';
import { AuthService } from './auth-service';

describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    service.changePermission('PERMISSION_1', true);
    service.changePermission('PERMISSION_2', false);
    service.changePermission('PERMISSION_3', true);
    service.changePermission('PERMISSION_4', false);
    service.changePermission('PERMISSION_5', true);
    service.changePermission('PERMISSION_6', false);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(AuthService.prototype.hasPermissions.name, () => {
    test('should return true if permission exists and enabled', () => {
      expect(service.hasPermissions('PERMISSION_1')()).toBe(true);
    });

    test('should return false if permission exists but disabled', () => {
      expect(service.hasPermissions('PERMISSION_2')()).toBe(false);
    });

    test('should return false if permission does not exist', () => {
      expect(service.hasPermissions('PERMISSION_NOT_EXISTS')()).toBe(false);
    });

    test('should return true if all permissions exist and are enabled', () => {
      expect(service.hasPermissions({ and: ['PERMISSION_1', 'PERMISSION_3', 'PERMISSION_5'] })()).toBe(true);
    });

    test('should return false if all permissions exist but one is disabled', () => {
      expect(service.hasPermissions({ and: ['PERMISSION_1', 'PERMISSION_2', 'PERMISSION_3'] })()).toBe(false);
    });

    test('should return true if at least one permission exists but is disabled', () => {
      expect(service.hasPermissions({ or: ['PERMISSION_1', 'PERMISSION_2', 'PERMISSION_3'] })()).toBe(true)
    });

    test('should return false if all permissions is disabled', () => {
      expect(service.hasPermissions({ or: ['PERMISSION_2', 'PERMISSION_4', 'PERMISSION_6'] })()).toBe(false);
    });

    test('should return true with nested permissions', () => {
      const level3: BooleanExpression = {
        and: [
          'PERMISSION_1',
          'PERMISSION_2'
        ]
      };
      const level2: BooleanExpression = {
        or: [
          'PERMISSION_1',
          level3
        ]
      };
      const level1: BooleanExpression = {
        and: [
          'PERMISSION_1',
          level2
        ]
      };

      expect(service.hasPermissions(level3)()).toBe(false);
      expect(service.hasPermissions(level2)()).toBe(true);
      expect(service.hasPermissions(level1)()).toBe(true);
    });

    test('should return false with nested permissions', () => {
      const level3: BooleanExpression = {
        or: [
          'PERMISSION_1',
          'PERMISSION_2'
        ]
      };
      const level2: BooleanExpression = {
        and: [
          'PERMISSION_2',
          level3
        ]
      };
      const level1: BooleanExpression = {
        and: [
          'PERMISSION_1',
          level2
        ]
      };

      expect(service.hasPermissions(level3)()).toBe(true);
      expect(service.hasPermissions(level2)()).toBe(false);
      expect(service.hasPermissions(level1)()).toBe(false);
    });
  });
});
