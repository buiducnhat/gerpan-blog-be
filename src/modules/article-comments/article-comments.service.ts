import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleCommentDto } from './dto/article-comment-create.dto';
import { UpdateArticleCommentDto } from './dto/article-comment-update.dto';
import { ArticleComment } from './entities/article-comment.entity';
import { ARTICLE_COMMENTS_MESSAGES } from './common/article-comments.constant';
import { User } from '@modules/users/entities/user.entity';
import { ArticlesService } from '@modules/articles/articles.service';
import * as _ from 'lodash';

@Injectable()
export class ArticleCommentsService {
  constructor(
    @InjectRepository(ArticleComment)
    private articleCommentRepository: Repository<ArticleComment>,
    private readonly articleService: ArticlesService,
  ) {}

  async create(createArticleCommentDto: CreateArticleCommentDto, user: User, articleId: number) {
    const newArticleComment = new ArticleComment();
    newArticleComment.user = user;
    newArticleComment.content = createArticleCommentDto.content;

    newArticleComment.article = await this.articleService.findOne(articleId);
    if (!newArticleComment.article) {
      throw new BadRequestException(ARTICLE_COMMENTS_MESSAGES.INVALID_ARTICLE);
    }

    if (!!createArticleCommentDto.parent) {
      newArticleComment.parent = await this.articleCommentRepository.findOne(
        createArticleCommentDto.parent,
      );
      if (!newArticleComment.parent) {
        throw new BadRequestException(ARTICLE_COMMENTS_MESSAGES.INVALID_PARENT);
      }
    }

    const articleComment = await this.articleCommentRepository.save(newArticleComment);
    return _.omit(articleComment, ['user', 'article']);
  }

  async update(id: number, user: User, updateArticleCommentDto: UpdateArticleCommentDto) {
    const articleComment = await this.articleCommentRepository
      .createQueryBuilder('comment')
      .select(['comment', 'user.id'])
      .leftJoin('comment.user', 'user')
      .where('comment.id = :id', { id })
      .getOne();

    if (!articleComment) {
      throw new NotFoundException(ARTICLE_COMMENTS_MESSAGES.NOT_FOUND);
    }
    if (articleComment.user.id !== user.id) {
      throw new ForbiddenException(ARTICLE_COMMENTS_MESSAGES.NO_PERMISSION);
    }

    articleComment.content = updateArticleCommentDto.content;

    await this.articleCommentRepository.save(articleComment);
    return _.omit(articleComment, ['user']);
  }

  async remove(id: number, user: User) {
    const articleComment = await this.articleCommentRepository
      .createQueryBuilder('comment')
      .select(['comment', 'user.id'])
      .leftJoin('comment.user', 'user')
      .where('comment.id = :id', { id })
      .getOne();

    if (!articleComment) {
      throw new NotFoundException(ARTICLE_COMMENTS_MESSAGES.NOT_FOUND);
    }
    if (articleComment.user.id !== user.id) {
      throw new ForbiddenException(ARTICLE_COMMENTS_MESSAGES.NO_PERMISSION);
    }

    return this.articleCommentRepository.delete(id);
  }
}
