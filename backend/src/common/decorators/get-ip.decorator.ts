import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const GetIp = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest<Request>();

    // X-Forwarded-For is set by proxies (Render, Vercel, Cloudflare, etc.)
    // trust proxy must be enabled in main.ts for req.ip to use this header
    const forwarded = request.headers['x-forwarded-for'];
    if (forwarded) {
      const firstIp = Array.isArray(forwarded)
        ? forwarded[0]
        : forwarded.split(',')[0];
      return firstIp.trim();
    }

    if (request.ip) {
      return request.ip;
    }

    if (request.socket?.remoteAddress) {
      return request.socket.remoteAddress;
    }

    return null;
  },
);

export const GetUserAgent = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.get('user-agent') || 'unknown';
  },
);
