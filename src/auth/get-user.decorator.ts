import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from './user.entity.js';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);