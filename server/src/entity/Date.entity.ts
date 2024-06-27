import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'date',
  underscored: true,
  modelName: 'DateEntity',
  createdAt: false,
  updatedAt: false,
})
export class DateEntity extends Model<DateEntity> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    comment: '发生日期',
  })
  date: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdTime: Date;
}
