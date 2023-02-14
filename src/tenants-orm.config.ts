import { join } from 'path';
import * as ormconfig from './orm.config';

module.exports = {
  ...ormconfig,
  entities: [
    join(__dirname, './modules/tenanted/**/entities/*.entity{.ts,.js}'),
  ],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: './migrations',
  },
};
