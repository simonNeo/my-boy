import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  applyDecorators,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserUnauthorizedException } from '../exception/UserUnauthorizedException';
import { JwtService } from '../../business/jwt/jwt.service';
import { RedisService } from '../../business/redis/redis.service';

@Injectable()
class UserAuthInterceptor implements NestInterceptor {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token as string;
    if (!token) {
      throw new UserUnauthorizedException('请先登录');
    }
    try {
      const decoded = this.jwtService.parseToken(token);
      const userId = await this.redisService.getUserRedisClient().get(token);
      if (decoded !== Number(userId)) {
        throw new Error();
      }
      request.uid = decoded;
    } catch (err) {
      throw new UserUnauthorizedException();
    }
    return next.handle();
  }
}

export const NeedLogin = applyDecorators(UseInterceptors(UserAuthInterceptor));
