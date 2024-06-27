import { Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CommonResponseInterceptor implements NestInterceptor {
  intercept(context, next) {
    return next.handle().pipe(map((data) => ({ code: 1, msg: '', data })));
  }
}
