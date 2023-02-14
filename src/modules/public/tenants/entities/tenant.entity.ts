import { DateGenericEntity } from '../../../../generic/entity/date.generic.entity';
import { textUpperCase } from '../../../../utils/textUpperCase';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'tenant' })
export class TenantEntity extends DateGenericEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 700,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({ name: 'name_db', type: 'text', nullable: false })
  nameDb: string;

  @BeforeInsert()
  uppercase() {
    this.nameDb = textUpperCase(this.name);
  }
}
