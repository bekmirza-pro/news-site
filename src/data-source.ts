import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 7777,
  username: 'postgres',
  password: 'justforward',
  database: 'uchar_systeam',
  synchronize: true,
  logging: true,
  entities: [
    join(__dirname, './modules/tenanted/**/entities/*.entity{.ts,.js}'),
  ],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
});
