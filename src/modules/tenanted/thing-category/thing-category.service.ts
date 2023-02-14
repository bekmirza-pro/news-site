import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { CurrentUserDto } from '../../../generic/dto/current-user.dto';
import { CGeneric } from '../../../generic/interface/res.generic.interface';
import { CONNECTION } from '../../../modules/tenancy/tenancy.symbols';
import { Connection, Repository } from 'typeorm';
import { CreateThingCategoryDto as CreateDto } from './dto/create-thing-category.dto';
import { UpdateThingCategoryDto as UpdateDto } from './dto/update-thing-category.dto';
import { ThingCategoryEntity } from './entities/thing-category.entity';

@Injectable()
export class ThingCategoryService {
  private readonly repository: Repository<ThingCategoryEntity>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.repository = connection.getRepository(ThingCategoryEntity);
  }

  async findAll() {
    try {
      const findAllData = await this.repository.find();

      if (!findAllData.length)
        return new CGeneric([' not found'], 204, findAllData);

      return new CGeneric([' all data'], 200, findAllData);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async create(dto: CreateDto, currentUser: CurrentUserDto) {
    try {
      let createdData = new ThingCategoryEntity();

      let key: string;

      for (key in dto) {
        createdData[key] = dto[key];
      }

      createdData = await this.repository.save(createdData);

      return new CGeneric([' created successfuly'], 201, createdData);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, dto: UpdateDto, currentUser: CurrentUserDto) {
    try {
      let updatedData = await this.findOne(id);

      if (!updatedData) return new CGeneric([' not found'], 204, []);

      let key: string;

      for (key in dto) {
        updatedData[key] = dto[key];
      }

      updatedData.updatedAt = new Date();

      updatedData = await this.repository.save(updatedData);

      return new CGeneric([' updated succesfuly'], 200, updatedData);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string, currentUser: CurrentUserDto) {
    try {
      const removed = await this.repository.delete(id);

      return new CGeneric([' created successfuly'], 200, removed);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    return await this.repository.findOne({
      where: { id },
    });
  }
}
