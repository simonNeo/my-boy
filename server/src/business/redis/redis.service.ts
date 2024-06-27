import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import RedLock, { Lock } from 'redlock';
// import {v4 as uuid} from 'uuid';

@Injectable()
export class RedisService {
  constructor(private configService: ConfigService) {}
  private redisDefaultClient: Redis; // 验证码db
  private redisComUserClient: Redis; // com_user db
  private redisLockClient: Redis; // lock db

  private getRedisConfig() {
    const { host, port, password } = this.configService.get('redis');
    return {
      port,
      host,
      password,
    };
  }

  getDefaultRedisClient() {
    if (!this.redisDefaultClient) {
      this.redisDefaultClient = new Redis({
        ...this.getRedisConfig(),
        db: this.configService.get('redisDB.default'),
      });
    }
    return this.redisDefaultClient;
  }
  getUserRedisClient() {
    if (!this.redisComUserClient) {
      this.redisComUserClient = new Redis({
        ...this.getRedisConfig(),
        db: this.configService.get('redisDB.user'),
      });
    }
    return this.redisComUserClient;
  }

  // 分布式锁
  getLockRedisClient() {
    if (!this.redisLockClient) {
      this.redisLockClient = new Redis({
        ...this.getRedisConfig(),
        db: this.configService.get('redisDB.lock'),
      });
    }
    return this.redisLockClient;
  }

  /**
   * 获取分布式锁
   * @param key 锁的key
   * @param expire 锁过期时间（单位秒）, 请确保业务处理时间小于锁过期时间，否则可能会被redis提前释放锁（而不是lock释放）。一般建议可以锁一分钟。
   * @returns {Lock}
   */
  async getLock(key: string, expire: number): Promise<Lock> {
    const client = this.getLockRedisClient();
    const redLock = new RedLock([client], {
      driftFactor: 0.01,
      retryCount: 20 * 2,
      retryDelay: 500,
      retryJitter: 200,
      automaticExtensionThreshold: 1000,
    });
    const lock = await redLock.acquire([key], expire * 1000);
    return lock;
  }
}
