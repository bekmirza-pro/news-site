import { DateGenericEntity } from '../../../../generic/entity/date.generic.entity';
import { ThingEntity } from '../../../tenanted/thing/entities/thing.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'thing_categories' })
export class ThingCategoryEntity extends DateGenericEntity {
  @Column({ name: 'name', type: 'varchar', length: 777, nullable: false })
  name: string;

  @OneToMany(() => ThingEntity, (thing) => thing.thingCategoryId)
  things: ThingEntity[];
}
