import { OmitType } from '@nestjs/swagger';

import { ArticleComment } from '../entities/article-comment.entity';

export class BasicArticleCommentDto extends OmitType(ArticleComment, ['article'] as const) {}
