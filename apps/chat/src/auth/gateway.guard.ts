import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class GatewayGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const userId = req.headers['x-user-id'] as string;
    const userEmail = req.headers['x-user-email'] as string;
    const isAdmin = req.headers['x-user-is-admin'] === 'true';

    if (!userId) throw new UnauthorizedException();

    req.user = { id: userId, email: userEmail, isAdmin };
    return true;
  }
}
