import { OmitType } from '@nestjs/swagger';

import { ArticleTag } from '../entities/article-tag.entity';

export class BasicArticleTagDto extends OmitType(ArticleTag, ['articles'] as const) {}
