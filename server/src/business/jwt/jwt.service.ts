import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly key: string;
  private readonly expire: number;
  constructor(configService: ConfigService) {
    const jwtConfig = configService.get('jwt');
    this.key = jwtConfig.token;
    this.expire = jwtConfig.expire;
  }
  createToken(uid: string | number) {
    const res = sign({ id: Number(uid) }, this.key, {
      expiresIn: this.expire * 24 * 60 * 60,
    });
    return res;
  }
  parseToken(token: string): number {
    const res = verify(token, this.key);
    if (typeof res === 'string') {
      throw new Error('token解析失败');
    }
    const { id } = res;
    const numId = Number(id);
    if (!numId) {
      throw new Error('token解析失败');
    }
    return numId;
  }
}
