import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';

describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(AuthService.prototype.hasPermissions.name, () => {
    it('should return true if permission exists and enabled', () => {
      expect(service.hasPermissions('PERMISSION_1')).toBe(true);
      expect(service.hasPermissions('PERMISSION_2')).toBe(false);
    });

    it('should return false if permission does not exist', () => {
      expect(service.hasPermissions('PERMISSION_NOT_EXISTS')).toBe(false);
    });
  });
});
