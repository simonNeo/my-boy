import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'record',
  underscored: true,
  modelName: 'RecordEntity',
  createdAt: false,
  updatedAt: false,
})
export class RecordEntity extends Model<RecordEntity> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
    comment: '用户id',
  })
  userId: number;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    comment: '发生日期',
  })
  date: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    comment: '发生时间',
  })
  time: string;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    comment: '类型，1：喂奶，2：换尿不湿，3:开始睡觉，4:睡醒，5:其他',
  })
  type: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: true,
    comment: '1亲喂，2瓶喂',
  })
  feedType: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: true,
    comment: '1母乳，2奶粉',
  })
  milkType: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
    comment: '亲喂时长，单位分钟',
  })
  feedTime: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
    comment: '瓶喂量，单位ml',
  })
  feedCapacity: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '是否有大便',
  })
  hasPoop: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '备注',
  })
  memo: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdTime: Date;
}
