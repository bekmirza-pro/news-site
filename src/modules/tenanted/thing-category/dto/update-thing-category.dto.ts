import { PartialType } from '@nestjs/swagger';
import { CreateThingCategoryDto } from './create-thing-category.dto';

export class UpdateThingCategoryDto extends PartialType(CreateThingCategoryDto) {}
