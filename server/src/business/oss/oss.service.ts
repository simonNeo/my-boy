import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import * as moment from 'moment';

@Injectable()
export class OssService {
  constructor(private configService: ConfigService) {}
  private getOssClient() {
    const config = this.configService.get('oss');
    return new Client({
      endPoint: config.endPoint,
      port: parseInt(config.port),
      useSSL: false,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
    });
  }

  async getTimelineFilePreUploadSign(uid: number, fileName: string) {
    const mmt = moment();
    const objectKey = `timeline/${mmt.format('YYYY-MM-DD')}/${uid}/${fileName}`;
    const url = await this.getOssClient().presignedPutObject('baby', objectKey, 60 * 60); // 1小时后过期
    return {
      url,
      key: objectKey,
    };
  }
}
