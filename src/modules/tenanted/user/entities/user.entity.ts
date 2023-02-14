import { DateGenericEntity } from '../../../../generic/entity/date.generic.entity';
import { RoomEntity } from '../../../tenanted/room/entities/room.entity';
import { ThingEntity } from '../../../tenanted/thing/entities/thing.entity';
import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends DateGenericEntity {
  @Column({ length: 100, nullable: false })
  firstname: string;

  @Column({ length: 100, nullable: false })
  lastname: string;

  @Column({ length: 77, nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @OneToMany(() => ThingEntity, (thing) => thing.userId)
  things: ThingEntity[];

  @OneToMany(() => RoomEntity, (room) => room.userId)
  rooms: RoomEntity[];
}
