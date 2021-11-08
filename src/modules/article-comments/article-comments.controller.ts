import { Controller } from '@nestjs/common';
import { ArticleCommentsService } from './article-comments.service';

@Controller('article-comments')
export class ArticleCommentsController {
  constructor(private readonly articleCommentsService: ArticleCommentsService) {}
}
