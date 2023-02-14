import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: +process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  JWT_RF_EXPIRES: process.env.JWT_RF_EXPIRES,
  JWT_AC_EXPIRES: process.env.JWT_AC_EXPIRES,
  DB_URL: process.env.DB_URL,
  DB_URL_TEST: process.env.DB_URL_TEST,
  ENV: process.env.ENV === 'DEV',
  LIMIT_PAGE: process.env.LIMIT_PAGE,
};
