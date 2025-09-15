import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private requests = new Map<string, { count: number; resetTime: number }>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    let ip = 'unknown';
    if (request.ip) {
      ip = request.ip;
    } else if (request.socket?.remoteAddress) {
      ip = request.socket.remoteAddress;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const fallbackIp = (request as any).connection?.remoteAddress;
      if (typeof fallbackIp === 'string') {
        ip = fallbackIp;
      }
    }

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minuto
    const maxRequests = 10;

    const record = this.requests.get(ip);

    if (!record || now > record.resetTime) {
      this.requests.set(ip, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxRequests) {
      throw new HttpException(
        'Rate limit exceeded. Try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count++;
    return true;
  }
}
