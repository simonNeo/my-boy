import * as dbDevConfig from '../db.dev.config.json';
export default () => {
  return {
    db: dbDevConfig,
    redis: {
      host: 'your ip address',
      port: 6379,
      password: 'simonredis',
    },
    redisDB: {
      default: 1,
      user: 2,
      lock: 7,
    },
    oss: {
      endPoint: 'your ip address',
      port: '9000',
      accessKey: '',
      secretKey: '',
    },
    jwt: {
      token: 'lzy_simon_jwt_key',
      expire: 60,
    },
    swaggerEnable: true,
  };
};
