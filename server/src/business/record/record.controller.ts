import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { CommonResponseInterceptor } from '../../helper/decorator/CommonResponse.interceptor';
import { NeedLogin } from '../../helper/decorator/NeedLogin.decorator';
import { UID } from '../../helper/decorator/UID.decorator';
import { CreateRecordDto, FilterRecordDto } from './dto';
import { RecordService } from './record.service';

@Controller('record')
@UseInterceptors(ClassSerializerInterceptor, CommonResponseInterceptor)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('/add')
  @NeedLogin
  async addRecord(@UID() uid: number, @Body() dto: CreateRecordDto) {
    return await this.recordService.createRecord(uid, dto);
  }

  @Get('/list')
  @NeedLogin
  async getRecordList(@UID() uid: number, @Query() dto: FilterRecordDto) {
    return await this.recordService.getRecordList(uid, dto);
  }
}
