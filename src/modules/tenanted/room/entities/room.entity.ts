import { DateGenericEntity } from '../../../../generic/entity/date.generic.entity';
import { ThingEntity } from '../../../tenanted/thing/entities/thing.entity';
import { UserEntity } from '../../../tenanted/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntity extends DateGenericEntity {
  @Column({ name: 'name', type: 'varchar', length: 700, nullable: false })
  name: string;

  @Column({ name: 'floor', type: 'int', default: 1 })
  floor: number;

  @ManyToOne(() => UserEntity, (user) => user.rooms, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  userId: UserEntity;

  @OneToMany(() => ThingEntity, (thing) => thing.roomId)
  things: ThingEntity[];
  updatedAt: Date;
}
