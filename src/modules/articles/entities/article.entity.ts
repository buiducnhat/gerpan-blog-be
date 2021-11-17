import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@src/modules/users/entities/user.entity';
import { ArticleCategory } from '@src/modules/article-categories/entities/article-category.entity';
import { ArticleTag } from '@src/modules/article-tags/entities/article-tag.entity';
import { ArticleComment } from '@src/modules/article-comments/entities/article-comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (author) => author.articles)
  author: User;

  @Column({ length: 100 })
  title: string;

  slug?: string;

  @Column({ type: 'tinytext', nullable: true })
  description: string;

  @Column()
  banner: string;

  @Column({ default: false })
  published: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => ArticleCategory, (category) => category.articles)
  category: ArticleCategory;

  @ManyToMany(() => ArticleTag, (tag) => tag.articles)
  @JoinTable()
  tags: ArticleTag[];

  @OneToMany(() => ArticleComment, (comment) => comment.article)
  comments: ArticleComment[];
}
