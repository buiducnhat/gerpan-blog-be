import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleCategoriesService } from './article-categories.service';
import { ArticleCategoriesController } from './article-categories.controller';
import { ArticleCategory } from './entities/article-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategory])],
  controllers: [ArticleCategoriesController],
  providers: [ArticleCategoriesService],
  exports: [ArticleCategoriesService],
})
export class ArticleCategoriesModule {}
