import { HttpException, HttpStatus } from '@nestjs/common';

export class UserUnauthorizedException extends HttpException {
  constructor(msg = '登录已失效，请重新登录！') {
    super(msg, HttpStatus.OK);
  }
}
