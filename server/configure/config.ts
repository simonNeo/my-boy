import devConfig from './config.dev';
import prodConfig from './config.prod';

export default () => {
  const env = process.env.NODE_ENV || 'production';
  const isProd = env === 'production';
  return isProd ? prodConfig() : devConfig();
};
