import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUserDto } from '../../../generic/dto/current-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.userService.create(createUserDto, currentUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.userService.update(id, updateUserDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() currentUser: CurrentUserDto) {
    return this.userService.remove(id, currentUser);
  }
}
