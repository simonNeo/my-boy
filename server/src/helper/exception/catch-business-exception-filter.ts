import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import CommonUtil from '../tools/CommonUtil';
import { BusinessException } from './BusinessException';

@Catch(BusinessException)
export class BusinessExceptionsFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(200).json(CommonUtil.returnError(exception.message));
  }
}
