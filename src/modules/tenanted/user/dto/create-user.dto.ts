import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'firstname',
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    type: String,
    description: 'lastname',
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    type: String,
    description: 'username',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description:
      "password - Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, son bo'lishi, belgi bo'lishi kerak!",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(17)
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9][a-zA-Z0-9!@#$%^&*.,_-]{6,17}$/,
    {
      message:
        "Password - Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, son bo'lishi, belgi bo'lishi kerak!",
    },
  )
  password: string;
}
