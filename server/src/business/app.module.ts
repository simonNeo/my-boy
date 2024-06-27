import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../../configure/config';
import { RedisModule } from './redis/redis.module';
import { RecordModule } from './record/record.module';
import { DateEntity } from '../entity/Date.entity';
import { RecordEntity } from '../entity/Record.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from '../entity/User.entity';
import { JwtModule } from './jwt/jwt.module';
import { OssModule } from './oss/oss.module';
import { TimelineEntity } from '../entity/Timeline.entity';
import { TimelineAttachmentsEntity } from '../entity/TimelineAttachments.entity';
import { TimelineModule } from './timeline/timeline.module';
const projectModels = [DateEntity, RecordEntity, UserEntity, TimelineEntity, TimelineAttachmentsEntity];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    RedisModule,
    JwtModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('db');
        return {
          dialect: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          autoLoadModels: true,
          models: projectModels,
          synchronize: false,
          timezone: '+08:00',
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    RecordModule,
    UserModule,
    OssModule,
    TimelineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log('应用启动完成');
  }
}
