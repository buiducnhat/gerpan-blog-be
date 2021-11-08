import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { Article } from './entities/article.entity';
import { convertDTO } from '@src/utils/common.util';
import { ARTICLE_MESSAGES } from './common/articles.constant';
import { ArticleTag } from '@modules/article-tags/entities/article-tag.entity';
import { ArticleComment } from '@modules/article-comments/entities/article-comment.entity';
import { ArticleCategory } from '@modules/article-categories/entities/article-category.entity';
import { User } from '@modules/users/entities/user.entity';
import { PaginationParamsDto, PaginationDto } from '@src/modules/pagination/dto/pagination.dto';
import { PaginationService } from '@modules/pagination/pagination.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(ArticleCategory)
    private articleCategoryRepository: Repository<ArticleCategory>,
    @InjectRepository(ArticleTag)
    private articleTagRepository: Repository<ArticleTag>,
    @InjectRepository(ArticleComment)
    private articleCommentRepository: Repository<ArticleComment>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createArticleDto: CreateArticleDto, user: User) {
    const newArticle = new Article();
    convertDTO(createArticleDto, newArticle);

    // Insert author
    newArticle.author = user;

    // Insert article category
    newArticle.category = await this.articleCategoryRepository.findOne(createArticleDto.category);
    if (!newArticle.category) {
      throw new BadRequestException(ARTICLE_MESSAGES.INVALID_CATEGORY);
    }

    // Insert article tags
    newArticle.tags = await this.articleTagRepository.findByIds(createArticleDto.tags);

    return this.articleRepository.save(newArticle);
  }

  async findAll(params: PaginationParamsDto): Promise<PaginationDto<Article>> {
    const result = await this.articleRepository
      .createQueryBuilder('art')
      .select([
        'art',
        'aut.id',
        'aut.firstName',
        'aut.lastName',
        'aut.avatar',
        'aut.lastLogin',
        'cat',
        'tag',
        'com',
      ])
      .leftJoin('art.category', 'cat')
      .leftJoin('art.tags', 'tag')
      .leftJoin('art.comments', 'com')
      .leftJoin('art.author', 'aut')
      .take(params.limit)
      .skip((params.page - 1) * params.limit)
      .getManyAndCount();

    const [articles, total] = result;

    return this.paginationService.paginate(params, articles, total);
  }

  async findOne(id: number) {
    const article = await this.articleRepository
      .createQueryBuilder('art')
      .select([
        'art',
        'aut.id',
        'aut.firstName',
        'aut.lastName',
        'aut.avatar',
        'aut.lastLogin',
        'cat',
        'tag',
        'com',
      ])
      .leftJoin('art.category', 'cat')
      .leftJoin('art.tags', 'tag')
      .leftJoin('art.comments', 'com')
      .leftJoin('art.author', 'aut')
      .where('art.id = :id', { id })
      .getOne();

    if (!article) throw new NotFoundException(ARTICLE_MESSAGES.NOT_FOUND);
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.findOne(id);
    if (!article) throw new NotFoundException(ARTICLE_MESSAGES.NOT_FOUND);

    convertDTO(updateArticleDto, article);
    return this.articleRepository.save(article);
  }

  async remove(id: number) {
    const result = await this.articleRepository.delete(id);
    if (result.affected) throw new NotFoundException(ARTICLE_MESSAGES.NOT_FOUND);

    return result;
  }
}
