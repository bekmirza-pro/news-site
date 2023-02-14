import { Test, TestingModule } from '@nestjs/testing';
import { ThingCategoryService } from './thing-category.service';

describe('ThingCategoryService', () => {
  let service: ThingCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThingCategoryService],
    }).compile();

    service = module.get<ThingCategoryService>(ThingCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
