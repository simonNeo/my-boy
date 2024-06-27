import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { CommonResponseInterceptor } from '../../helper/decorator/CommonResponse.interceptor';
import { NeedLogin } from '../../helper/decorator/NeedLogin.decorator';
import { UID } from '../../helper/decorator/UID.decorator';
import { OssService } from './oss.service';

@Controller('file')
@UseInterceptors(ClassSerializerInterceptor, CommonResponseInterceptor)
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Get('/timeline/upload/sign')
  @NeedLogin
  async getTimelineFilePreUploadSign(@UID() uid: number, fileName: string) {
    return this.ossService.getTimelineFilePreUploadSign(uid, fileName);
  }
}
