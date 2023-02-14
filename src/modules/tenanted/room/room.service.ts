import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateRoomDto as CreateDto } from './dto/create-room.dto';
import { UpdateRoomDto as UpdateDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { CONNECTION } from '../../tenancy/tenancy.symbols';
import { CGeneric } from '../../../generic/interface/res.generic.interface';
import { CurrentUserDto } from '../../../generic/dto/current-user.dto';

@Injectable()
export class RoomService {
  private readonly repository: Repository<RoomEntity>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.repository = connection.getRepository(RoomEntity);
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
      let createdData = new RoomEntity();

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
