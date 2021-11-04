import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Article } from '@src/modules/articles/entities/article.entity';
import { User } from '@src/modules/users/entities/user.entity';

@Entity()
export class ArticleComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @ManyToOne(() => User, (user) => user.articleComments)
  user: User;

  @Column({ type: 'tinytext' })
  content: string;

  @ManyToOne(() => ArticleComment, (parent) => parent.children, { nullable: true })
  parent: ArticleComment;

  @OneToMany(() => ArticleComment, (child) => child.parent)
  children: ArticleComment[];

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
