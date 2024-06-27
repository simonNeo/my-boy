import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'timeline_attachments',
  underscored: true,
  modelName: 'TimelineAttachmentsEntity',
  createdAt: false,
  updatedAt: false,
})
export class TimelineAttachmentsEntity extends Model<TimelineAttachmentsEntity> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'timeline表id',
  })
  timelineId: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    comment: '附件类型, 1: 图片, 2: 视频',
    defaultValue: 1,
  })
  type: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '附件名称',
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '附件地址',
  })
  url: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdTime: Date;
}
