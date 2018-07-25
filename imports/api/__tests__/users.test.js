import { validateNewUser } from '../users';

describe('Users', function () {

  it('should allow valid email address', function () {
    const testUser = {
      emails: [
        {
          address: 'test@example.com'
        }
      ]
    };
    const res = validateNewUser(testUser);

    expect(res).toBe(true);
  });

  it('should reject invalid email address', function () {
    const testUser = {
      emails: [
        {
          address: 'invalid email'
        }
      ]
    };

    expect(() => validateNewUser(testUser)).toThrow();
  });
});
