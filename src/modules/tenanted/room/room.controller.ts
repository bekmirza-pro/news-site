import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUserDto } from '../../../generic/dto/current-user.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(
    @Body() createRoomDto: CreateRoomDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.roomService.create(createRoomDto, currentUser);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() currentUser: CurrentUserDto) {
    return this.roomService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.roomService.update(id, updateRoomDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() currentUser: CurrentUserDto) {
    return this.roomService.remove(id, currentUser);
  }
}
