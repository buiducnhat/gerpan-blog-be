import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { Article } from './entities/article.entity';
import { convertDTO } from '@src/utils/common.util';
import { ARTICLE_MESSAGES } from './common/articles.constant';
import { ArticleTag } from '@modules/article-tags/entities/article-tag.entity';
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
      .createQueryBuilder('article')
      .select([
        'article',
        'author.id',
        'author.firstName',
        'author.lastName',
        'author.avatar',
        'author.lastLogin',
        'category',
        'tag',
        'comment',
        'commentUser.id',
        'commentUser.firstName',
        'commentUser.lastName',
        'commentUser.avatar',
        'commentUser.lastLogin',
      ])
      .leftJoin('article.category', 'category')
      .leftJoin('article.tags', 'tag')
      .leftJoin('article.comments', 'comment')
      .leftJoin('article.author', 'author')
      .leftJoin('comment.user', 'commentUser')
      .take(params.limit)
      .skip((params.page - 1) * params.limit)
      .getManyAndCount();

    const [articles, total] = result;

    return this.paginationService.paginate(params, articles, total);
  }

  async findOne(id: number) {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .select([
        'article',
        'author.id',
        'author.firstName',
        'author.lastName',
        'author.avatar',
        'author.lastLogin',
        'category',
        'tag',
        'comment',
        'commentUser.id',
        'commentUser.firstName',
        'commentUser.lastName',
        'commentUser.avatar',
        'commentUser.lastLogin',
      ])
      .leftJoin('article.category', 'category')
      .leftJoin('article.tags', 'tag')
      .leftJoin('article.comments', 'comment')
      .leftJoin('article.author', 'author')
      .leftJoin('comment.user', 'commentUser')
      .where('article.id = :id', { id })
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
