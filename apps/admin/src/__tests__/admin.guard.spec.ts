import { AdminGuard } from '../auth/admin.guard';
import { ForbiddenException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

const mockContext = (isAdmin: boolean): ExecutionContext =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({ user: { id: 'user-1', isAdmin } }),
    }),
  }) as unknown as ExecutionContext;

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    guard = new AdminGuard();
  });

  it('should allow access for admin users', () => {
    expect(guard.canActivate(mockContext(true))).toBe(true);
  });

  it('should throw ForbiddenException for non-admin users', () => {
    expect(() => guard.canActivate(mockContext(false))).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when no user', () => {
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({ user: null }),
      }),
    } as unknown as ExecutionContext;
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });
});
