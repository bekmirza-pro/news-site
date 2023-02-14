import { PartialType } from '@nestjs/swagger';
import { CreateThingDto } from './create-thing.dto';

export class UpdateThingDto extends PartialType(CreateThingDto) {}
