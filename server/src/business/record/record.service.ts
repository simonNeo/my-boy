import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { RecordEntity } from '../../entity/Record.entity';
import { CreateRecordDto, FilterRecordDto } from './dto';

@Injectable()
export class RecordService {
  constructor(private sequelize: Sequelize) {}
  async createRecord(uid: number, dto: CreateRecordDto) {
    await this.sequelize.transaction(async (t) => {
      await RecordEntity.create({ ...dto, userId: uid }, { transaction: t });
    });
  }

  async getRecordList(uid: number, dto: FilterRecordDto) {
    const { date, type } = dto;
    const where = {
      userId: uid,
    };
    if (date) {
      where['date'] = date;
    }
    if (type) {
      where['type'] = type;
    }
    const res = await RecordEntity.findAll({ where, order: [['time', 'DESC']], raw: true });
    return res;
  }
}
