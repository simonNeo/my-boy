import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { TimelineEntity } from '../../entity/Timeline.entity';
import { TimelineAttachmentsEntity } from '../../entity/TimelineAttachments.entity';
import { OssService } from '../oss/oss.service';
import { CreateTimelineDto } from './timeline.dto';
// import {mapLimit} from 'async';

@Injectable()
export class TimelineService {
  constructor(private ossService: OssService, private sequelize: Sequelize) {}
  // MARK: 新增时间轴记录
  async createTimeLine(uid: number, dto: CreateTimelineDto) {
    const { content, attachments } = dto;

    await this.sequelize.transaction(async (t) => {
      // 保存时间轴记录
      const timelineEntity = await TimelineEntity.create(
        {
          userId: uid,
          content,
        },
        { transaction: t },
      );

      // 处理附件
      if (attachments.length) {
        await TimelineAttachmentsEntity.bulkCreate(
          attachments.map((e) => ({
            ...e,
            timelineId: timelineEntity.id,
          })),
          { transaction: t },
        );
      }
    });
    return true;
  }
}
