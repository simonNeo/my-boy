import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('foo')
  @ApiResponse({ status: 200, type: String, description: 'foo' })
  alive(): string {
    return this.appService.alive();
  }
}
