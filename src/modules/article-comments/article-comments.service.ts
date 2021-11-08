import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleCommentDto } from './dto/article-comment-create.dto';
import { UpdateArticleCommentDto } from './dto/article-comment-update.dto';
import { ArticleComment } from './entities/article-comment.entity';
import { convertDTO } from '@src/utils/common.util';
import { ARTICLE_COMMENTS_MESSAGES } from './common/article-comments.constant';

@Injectable()
export class ArticleCommentsService {
  constructor(
    @InjectRepository(ArticleComment)
    private articleCommentRepository: Repository<ArticleComment>,
  ) {}

  create(createArticleCommentDto: CreateArticleCommentDto) {
    const newArticleComment = new ArticleComment();
    convertDTO(createArticleCommentDto, newArticleComment);

    return this.articleCommentRepository.save(newArticleComment);
  }

  findAll() {
    return this.articleCommentRepository.find();
  }

  findOne(id: number) {
    return this.articleCommentRepository.findOne(id);
  }

  async update(id: number, updateArticleCommentDto: UpdateArticleCommentDto) {
    const articleComment = await this.articleCommentRepository.findOne(id);
    if (!articleComment) throw new NotFoundException(ARTICLE_COMMENTS_MESSAGES.NOT_FOUND);

    convertDTO(updateArticleCommentDto, articleComment);
    return this.articleCommentRepository.save(articleComment);
  }

  async remove(id: number) {
    const result = await this.articleCommentRepository.delete(id);
    if (result.affected) throw new NotFoundException(ARTICLE_COMMENTS_MESSAGES.NOT_FOUND);

    return result;
  }
}
