import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  underscored: true,
  modelName: 'UserEntity',
  createdAt: false,
  updatedAt: false,
})
export class UserEntity extends Model<UserEntity> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  account: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  pwd: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  babyName: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  babyBirthday: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdTime: Date;
}
