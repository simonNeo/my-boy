import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
