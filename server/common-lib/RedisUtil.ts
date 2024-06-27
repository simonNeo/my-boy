export class RedisUtil {
  // 锁相关
  static LOCK_SPU_STOCK_KEY = 'LOCK_SPU_STOCK_KEY_';

  // 其他redis key
  static COM_USER_KEY = '_COM_USER_KEY_';

  // oa用户登录验证码
  static getComUserLoginCodeKey(phone: string) {
    return '8' + this.COM_USER_KEY + phone; // 8代表登录验证码
  }

  // oa用户token
  static getComUserTokenKey(platform: string, uid: number) {
    return platform + this.COM_USER_KEY + uid;
  }

  // 各系统通用，锁商品库存
  static getLockSpuStockKey(spuId: number) {
    return this.LOCK_SPU_STOCK_KEY + spuId;
  }
}
