import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import CommonUtil from '../tools/CommonUtil';
import { UserUnauthorizedException } from './UserUnauthorizedException';

@Catch(UserUnauthorizedException)
export class UserUnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UserUnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(200).json(CommonUtil.returnError(exception.message, 8000));
  }
}
