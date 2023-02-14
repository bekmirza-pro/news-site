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
import { ThingService } from './thing.service';
import { CreateThingDto } from './dto/create-thing.dto';
import { UpdateThingDto } from './dto/update-thing.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUserDto } from '../../../generic/dto/current-user.dto';

@ApiTags('thing')
@Controller('thing')
export class ThingController {
  constructor(private readonly thingService: ThingService) {}

  @Post()
  create(
    @Body() createThingDto: CreateThingDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.thingService.create(createThingDto, currentUser);
  }

  @Get()
  findAll() {
    return this.thingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thingService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateThingDto: UpdateThingDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.thingService.update(id, updateThingDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() currentUser: CurrentUserDto) {
    return this.thingService.remove(id, currentUser);
  }
}
