import { Global, Module } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  controllers: [OssController],
  providers: [OssService],
  imports: [ConfigModule],
  exports: [OssService],
})
export class OssModule {}
