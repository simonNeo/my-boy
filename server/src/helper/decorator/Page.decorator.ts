import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Page = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const query = request?.query || {};
  const { pageIndex, pageSize } = query;
  return { pageIndex: Number(pageIndex) || 1, pageSize: Number(pageSize) || 20 };
});
