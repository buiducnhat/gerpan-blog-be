import { Article } from '@src/modules/articles/entities/article.entity';
import { ArticleComment } from '@src/modules/article-comments/entities/article-comment.entity';
import { UserRole } from '@src/modules/users/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Social } from './social.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ length: 500, nullable: true })
  bio: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

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

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => ArticleComment, (articleComment) => articleComment.user)
  articleComments: ArticleComment[];

  @OneToMany(() => Social, (social) => social.user)
  socials: Social[];
}
