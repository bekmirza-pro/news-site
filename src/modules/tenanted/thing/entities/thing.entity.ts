import { DateGenericEntity } from '../../../../generic/entity/date.generic.entity';
import { RoomEntity } from '../../../tenanted/room/entities/room.entity';
import { ThingCategoryEntity } from '../../../tenanted/thing-category/entities/thing-category.entity';
import { UserEntity } from '../../../tenanted/user/entities/user.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'things' })
export class ThingEntity extends DateGenericEntity {
  @Column({ name: 'name', type: 'varchar', length: 777, nullable: false })
  name: string;

  @Column({
    name: 'purchased_price',
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: false,
  })
  purchasedPrice: number;

  @Column({
    name: 'sold_price',
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
  })
  soldPrice: number;

  @Column({ name: 'inventory', type: 'text', nullable: false, unique: true })
  inventory: string;

  @Column({ name: 'write_off', type: 'boolean', default: false })
  writeOff: boolean;

  @Column({ name: 'write_off_date', type: 'timestamp', nullable: false })
  writeOffDate: Date;

  @Column({ name: 'write_off_at', type: 'timestamp', nullable: true })
  writeOffAt: Date;

  @ManyToOne(() => RoomEntity, (room) => room.things, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'room_id' })
  roomId: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.things, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;

  @ManyToOne(
    () => ThingCategoryEntity,
    (thingCategory) => thingCategory.things,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'thing_category_id' })
  thingCategoryId: ThingCategoryEntity;
}
