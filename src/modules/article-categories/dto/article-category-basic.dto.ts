import { OmitType } from '@nestjs/swagger';

import { ArticleCategory } from '../entities/article-category.entity';

export class BasicArticleCategoryDto extends OmitType(ArticleCategory, [
  'articles',
  'children',
  'parent',
  'level',
] as const) {
  level: number;
}
