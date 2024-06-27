import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { UserEntity } from '../../entity/User.entity';
import { BusinessException } from '../../helper/exception/BusinessException';
import { JwtService } from '../jwt/jwt.service';
import { RedisService } from '../redis/redis.service';
import { EditBabyInfoDto, LoginDto, RegisterDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(readonly redisService: RedisService, readonly jwtService: JwtService) {}
  async register(dto: RegisterDto) {
    const { account, pwd } = dto;
    const found = await UserEntity.findOne({ where: { account } });
    if (found) {
      throw new BusinessException('该账号已被注册');
    }
    await UserEntity.create({
      account,
      pwd,
    });
    return await this.login(dto);
  }
  async login(dto: LoginDto) {
    const { account, pwd } = dto;
    const found = await UserEntity.findOne({
      where: { account, pwd },
      attributes: {
        exclude: ['pwd'],
      },
    });
    if (!found) {
      throw new BusinessException('账号或密码错误');
    }
    const uid = found.id;
    const userClient = this.redisService.getUserRedisClient();
    const token = this.jwtService.createToken(uid);
    await userClient.set(token, uid, 'EX', 30 * 24 * 60 * 60);
    return {
      ...found.toJSON(),
      token,
    };
  }

  // MARK: 获取user info
  async userInfo(uid: number) {
    const res = await UserEntity.findOne({
      where: { id: uid },
      attributes: ['id', 'babyName', 'babyBirthday'],
      raw: true,
    });
    return res;
  }

  async editBabyInfo(uid: number, dto: EditBabyInfoDto) {
    const user = await UserEntity.findOne({ where: { id: uid } });
    if (!user) {
      throw new BusinessException('用户不存在');
    }
    await user.update({
      babyName: dto.babyName,
      babyBirthday: moment(dto.babyBirthday),
    });
    return {
      id: user.id,
      babyName: user.babyName,
      babyBirthday: user.babyBirthday,
    };
  }
}
