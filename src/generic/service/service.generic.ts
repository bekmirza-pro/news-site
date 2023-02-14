import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CurrentUserDto } from '../dto/current-user.dto';
import { CGeneric } from '../interface/res.generic.interface';

export class BasicService<CreateDto, UpdateDto> {
  constructor(private param: string, private repository: Repository<any>) {
    this.param = param;
    this.repository = repository;
  }

  async findAll() {
    try {
      const findAllData = await this.repository.find();

      if (!findAllData.length)
        return new CGeneric([this.param + ' not found'], 204, findAllData);

      return new CGeneric([this.param + ' all data'], 200, findAllData);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async create(dto: CreateDto, currentUser: CurrentUserDto) {
    try {
      let createdData = this.repository.create({
        ...dto,
        createdBy: currentUser?.id,
      });

      createdData = await this.repository.save(createdData);

      return new CGeneric(
        [this.param + ' created successfuly'],
        201,
        createdData,
      );
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, dto: UpdateDto, currentUser: CurrentUserDto) {
    try {
      let updatedData = await this.findOne(id);

      if (!updatedData)
        return new CGeneric([this.param + ' not found'], 204, []);

      let key: string;

      for (key in dto) {
        updatedData[key] = dto[key];
      }

      updatedData.updatedAt = new Date();

      if (currentUser.id) {
        updatedData.updatedBy = currentUser.id;
      }

      updatedData = await this.repository.save(updatedData);

      return new CGeneric(
        [this.param + ' updated succesfuly'],
        200,
        updatedData,
      );
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string, currentUser: CurrentUserDto) {
    try {
      const removed = await this.repository.delete(id);

      return new CGeneric([this.param + ' created successfuly'], 200, removed);
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
