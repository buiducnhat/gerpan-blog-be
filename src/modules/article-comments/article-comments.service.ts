import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleCommentDto } from './dto/article-comment-create.dto';
import { UpdateArticleCommentDto } from './dto/article-comment-update.dto';
import { ArticleComment } from './entities/article-comment.entity';
import { convertDTO } from '@src/utils/common.util';
import { ARTICLE_COMMENTS_MESSAGES } from './common/article-comments.constant';
import { User } from '@modules/users/entities/user.entity';
import { Article } from '@modules/articles/entities/article.entity';
import { ArticlesService } from '@modules/articles/articles.service';

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

    return this.articleCommentRepository.save(newArticleComment);
  }

  findAllOfArticle(articleId: number) {
    return this.articleCommentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.article', 'article')
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.children', 'chilren')
      .where('article.id = :articleId', { articleId })
      .getMany();
  }

  findOne(articleId: number, id: number) {
    return this.articleCommentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.article', 'article')
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.children', 'chilren')
      .where('article.id = :articleId', { articleId })
      .where('comment.id = :id', { id })
      .getOne();
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
