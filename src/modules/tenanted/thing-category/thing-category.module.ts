import { Module } from '@nestjs/common';
import { ThingCategoryService } from './thing-category.service';
import { ThingCategoryController } from './thing-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThingCategoryEntity } from './entities/thing-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThingCategoryEntity])],
  controllers: [ThingCategoryController],
  providers: [ThingCategoryService],
})
export class ThingCategoryModule {}
