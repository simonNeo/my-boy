const devConfig = require('../../../db.dev.config.json');


const prodConfig = {
  ...devConfig,
  host: process.env.DB_MASTER_HOST,
  username: process.env.DB_MASTER_USER,
  password: process.env.DB_MASTER_PWD,
};

module.exports = {
  development: devConfig,
  production: prodConfig,
};
