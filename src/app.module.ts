import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/tenanted/user/user.module';
import { RoomModule } from './modules/tenanted/room/room.module';
import { ThingModule } from './modules/tenanted/thing/thing.module';
import { ThingCategoryModule } from './modules/tenanted/thing-category/thing-category.module';
import config from './config';

import * as ormconfig from './orm.config';
import { TenancyModule } from './modules/tenancy/tenancy.modules';
import { TenantsModule } from './modules/public/tenants/tenant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    JwtModule.register({
      secret: config.JWT_KEY,
      signOptions: { expiresIn: config.JWT_AC_EXPIRES },
    }),
    TenancyModule,
    TenantsModule,
    UserModule,
    RoomModule,
    ThingModule,
    ThingCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
