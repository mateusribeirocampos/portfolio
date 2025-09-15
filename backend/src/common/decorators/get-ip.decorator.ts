import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const GetIp = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (request.ip) {
      return request.ip;
    }

    if (request.socket?.remoteAddress) {
      return request.socket.remoteAddress;
    }

    // Fallback for older Node.js versions or specific proxy configurations
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const requestWithConnection = request as any;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (requestWithConnection.connection?.remoteAddress) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return String(requestWithConnection.connection.remoteAddress);
      }
    } catch {
      // Ignore errors accessing connection property
    }

    return 'unknown';
  },
);

export const GetUserAgent = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.get('user-agent') || 'unknown';
  },
);
