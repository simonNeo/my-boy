import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BusinessException } from '../helper/exception/BusinessException';
import { BusinessExceptionsFilter } from '../helper/exception/catch-business-exception-filter';
import { UserUnauthorizedExceptionFilter } from '../helper/exception/catch-user-unauthorized-exception-filter';

import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
moment.locale('zh-cn');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerEnable = configService.get('swaggerEnable');

  if (swaggerEnable) {
    const config = new DocumentBuilder().setTitle('发芽OA端').setDescription('OA端接口文档').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_, methodKey) => methodKey,
    });
    SwaggerModule.setup('/docs', app, document);
  }

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const error = errors[0];
        const msg = Object.values(error.constraints).join('');
        return new BusinessException(msg);
      },
    }),
  );
  app.useGlobalFilters(new BusinessExceptionsFilter());
  app.useGlobalFilters(new UserUnauthorizedExceptionFilter());
  await app.listen(3000);
}
bootstrap();
