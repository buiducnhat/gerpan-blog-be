import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { ArticleTag } from '@modules/article-tags/entities/article-tag.entity';
import { ArticleComment } from '@modules/articlle-comments/entities/articlle-comment.entity';
import { ArticleCategory } from '@modules/article-categories/entities/article-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleCategory, ArticleTag, ArticleComment])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
