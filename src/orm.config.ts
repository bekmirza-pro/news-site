import { join } from 'path';
import config from './config';

module.exports = {
  type: 'postgres',
  url: config.ENV ? config.DB_URL_TEST : config.DB_URL,
  synchronize: true,
  autoLoadEntities: true,
  logger: 'debug',
  entities: [
    join(__dirname, './modules/public/tenants/entities/*.entity{.ts,.js}'),
  ],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
};
