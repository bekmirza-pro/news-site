import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumberString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateThingDto {
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'purchasedPrice',
  })
  @IsNotEmpty()
  @IsNumberString()
  purchasedPrice: string;

  @ApiProperty({
    type: String,
    description: 'inventory',
  })
  @IsNotEmpty()
  @IsString()
  inventory: string;

  @ApiProperty({
    type: Date,
    description: 'writeOffDate',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  writeOffDate: Date;

  @ApiProperty({
    type: String,
    description: 'roomId',
  })
  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @ApiProperty({
    type: String,
    description: 'thingCategoryId',
  })
  @IsNotEmpty()
  @IsUUID()
  thingCategoryId: string;

  @ApiProperty({
    type: String,
    description: 'userId',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
