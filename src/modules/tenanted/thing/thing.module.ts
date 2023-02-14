import { Module } from '@nestjs/common';
import { ThingService } from './thing.service';
import { ThingController } from './thing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThingEntity } from './entities/thing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThingEntity])],
  controllers: [ThingController],
  providers: [ThingService],
})
export class ThingModule {}
