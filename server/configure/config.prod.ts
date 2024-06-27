import * as dbDevConfig from '../db.dev.config.json';
export default () => {
  return {
    db: {
      ...dbDevConfig,
      host: process.env.DB_MASTER_HOST,
      username: process.env.DB_MASTER_USER,
      password: process.env.DB_MASTER_PWD,
    },
    redis: {
      host: process.env.MAIN_REDIS_HOST,
      port: 6379,
      password: process.env.MAIN_REDIS_PWD,
    },
    redisDB: {
      default: 1,
      user: 2,
      lock: 7,
    },
    oss: {
      endPoint: 'you ip address',
      port: '9000',
      accessKey: '',
      secretKey: '',
    },
    jwt: {
      token: 'lzy_simon_jwt_key',
      expire: 60,
    },
    sms: {
      ali: {
        accessKeyId: process.env.OSS_AK,
        secretAccessKey: process.env.OSS_SK,
      },
    },
    swaggerEnable: false,
  };
};
