import { Article } from '@src/modules/articles/entities/article.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleCategoryLevel } from '../enums/article-category-level.enum';

@Entity()
export class ArticleCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'enum', enum: ArticleCategoryLevel })
  level: ArticleCategoryLevel;

  @Column({ length: 100 })
  slug: string;

  @ManyToOne(() => ArticleCategory, (parent) => parent.children, { nullable: true })
  parent: ArticleCategory;

  @OneToMany(() => ArticleCategory, (child) => child.parent)
  children: ArticleCategory[];

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updateAt: Date;
}
