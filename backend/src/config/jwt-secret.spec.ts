import { getJwtSecret } from './jwt-secret';

describe('getJwtSecret', () => {
  const originalJwtSecret = process.env.JWT_SECRET;

  afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  });

  it('returns the configured JWT secret', () => {
    process.env.JWT_SECRET = 'test-jwt-secret';

    expect(getJwtSecret()).toBe('test-jwt-secret');
  });

  it('throws when JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;

    expect(() => getJwtSecret()).toThrow('JWT_SECRET must be configured');
  });
});
