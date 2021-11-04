import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SocialProvider } from '@modules/users/enums/social-provider.enum';
import { User } from './user.entity';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socialId: string;

  @Column({ type: 'enum', enum: SocialProvider })
  provider: SocialProvider;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.socials)
  user: User;
}
