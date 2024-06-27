import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'timeline',
  underscored: true,
  modelName: 'TimelineEntity',
  createdAt: false,
  updatedAt: false,
})
export class TimelineEntity extends Model<TimelineEntity> {
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
    comment: 'user表id',
  })
  userId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '内容',
  })
  content: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdTime: Date;
}
