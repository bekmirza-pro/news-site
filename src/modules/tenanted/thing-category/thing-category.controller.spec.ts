import { Test, TestingModule } from '@nestjs/testing';
import { ThingCategoryController } from './thing-category.controller';
import { ThingCategoryService } from './thing-category.service';

describe('ThingCategoryController', () => {
  let controller: ThingCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThingCategoryController],
      providers: [ThingCategoryService],
    }).compile();

    controller = module.get<ThingCategoryController>(ThingCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
