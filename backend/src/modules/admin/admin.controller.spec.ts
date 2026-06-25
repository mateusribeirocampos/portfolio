import { GUARDS_METADATA } from '@nestjs/common/constants';
import { AdminController } from './admin.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('AdminController security metadata', () => {
  it('protects admin creation with JwtAuthGuard', () => {
    const guards =
      Reflect.getMetadata(
        GUARDS_METADATA,
        AdminController.prototype.createAdmin,
      ) ?? [];

    expect(guards).toContain(JwtAuthGuard);
  });
});
