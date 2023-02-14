import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'floor',
  })
  @IsOptional()
  @IsNumber()
  floor: number;

  @ApiProperty({
    type: String,
    description: 'userId',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
