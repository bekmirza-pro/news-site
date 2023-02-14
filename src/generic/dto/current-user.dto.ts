import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CurrentUserDto {
  @ApiProperty({
    type: Array,
    description: 'user id',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
