import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommonResponseInterceptor } from '../../helper/decorator/CommonResponse.interceptor';
import { NeedLogin } from '../../helper/decorator/NeedLogin.decorator';
import { UID } from '../../helper/decorator/UID.decorator';
import { CreateTimelineDto } from './timeline.dto';
import { TimelineService } from './timeline.service';

@Controller('timeline')
@UseInterceptors(ClassSerializerInterceptor, CommonResponseInterceptor)
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Post('/add')
  @NeedLogin
  async add(@UID() uid: number, @Body() dto: CreateTimelineDto) {
    return this.timelineService.createTimeLine(uid, dto);
  }
}
