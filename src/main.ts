import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { createConnection } from 'typeorm';
import { getTenantConnection } from './utils/tenancy.utils';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as tenantsOrmconfig from './tenants-orm.config';
import * as ormconfig from './orm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.getHttpAdapter().getInstance().disable('etag');

  const options = new DocumentBuilder()
    .setTitle('Uchar system')
    .setDescription('/api-swagger-json')
    .setVersion('0.0.1')
    .addTag('auth')
    .addApiKey({ type: 'apiKey', name: 'ac-token', in: 'header' }, 'ac-token')
    .build();

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use(tenancyMiddleware);

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

  const connection = await createConnection({
    ...(ormconfig as PostgresConnectionOptions),
    name: 'public',
    schema: 'public',
  });

  const schemas = await connection.query(
    'select schema_name as name from information_schema.schemata;',
  );
  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith('tenant_')) {
      try {
        const tenantName = schema.replace('tenant_', '');

        const connection2 = await getTenantConnection(tenantName);

        await connection2.runMigrations();
        await connection2.close();

        Logger.warn(`current schema: ${schema}`, 'schema');
        Logger.warn(`current schema name: ${tenantName}`, 'tenantName');
      } catch (error) {
        // console.log(error);

        Logger.error(error, 'error');
      }
    }
  }

  Logger.log('schema migration ran successfuly', 'migration');

  await app.listen(config.PORT, () => {
    Logger.log(`Server is running on http://localhost:${config.PORT}`);
  });
}
bootstrap();
