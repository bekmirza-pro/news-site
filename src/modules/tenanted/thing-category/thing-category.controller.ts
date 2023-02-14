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
import { ThingCategoryService } from './thing-category.service';
import { CreateThingCategoryDto } from './dto/create-thing-category.dto';
import { UpdateThingCategoryDto } from './dto/update-thing-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUserDto } from '../../../generic/dto/current-user.dto';

@ApiTags('thing-category')
@Controller('thing-category')
export class ThingCategoryController {
  constructor(private readonly thingCategoryService: ThingCategoryService) {}

  @Post()
  create(
    @Body() createThingCategoryDto: CreateThingCategoryDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.thingCategoryService.create(
      createThingCategoryDto,
      currentUser,
    );
  }

  @Get()
  findAll() {
    return this.thingCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thingCategoryService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateThingCategoryDto: UpdateThingCategoryDto,
    @Req() currentUser: CurrentUserDto,
  ) {
    return this.thingCategoryService.update(
      id,
      updateThingCategoryDto,
      currentUser,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() currentUser: CurrentUserDto) {
    return this.thingCategoryService.remove(id, currentUser);
  }
}
