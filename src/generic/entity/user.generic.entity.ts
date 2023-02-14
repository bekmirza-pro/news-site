import { UserEntity } from '../../modules/tenanted/user/entities/user.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { DateGenericEntity } from './date.generic.entity';

export class UserGenericEntity extends DateGenericEntity {
  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: UserEntity;
}
