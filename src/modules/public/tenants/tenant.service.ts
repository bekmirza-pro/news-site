import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTenantConnection } from '../../../utils/tenancy.utils';
import { getManager, Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    try {
      let tenant = new TenantEntity();

      tenant.name = createTenantDto.name;

      tenant = await this.tenantRepository.save(tenant);

      const schemaName = `tenant_${tenant.nameDb}`;

      await this.tenantRepository.manager.query(
        `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
      );

      const connection = await getTenantConnection(`${tenant.nameDb}`);

      await connection.runMigrations();
      await connection.close();
      return tenant;
    } catch (error) {
      return error.message;
    }
  }

  async findAll(): Promise<TenantEntity[]> {
    return this.tenantRepository.find();
  }
}
