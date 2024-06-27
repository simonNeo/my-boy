import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(msg = '服务异常') {
    super(msg, HttpStatus.OK);
  }
}
