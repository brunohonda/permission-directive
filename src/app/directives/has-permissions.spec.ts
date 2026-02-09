import { HasPermissions } from './has-permissions';

describe('HasPermissions', () => {
  it('should create an instance', () => {
    const directive = new HasPermissions();
    expect(directive).toBeTruthy();
  });
});
