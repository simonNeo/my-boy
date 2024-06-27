import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UID = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return Number(request?.uid);
});
