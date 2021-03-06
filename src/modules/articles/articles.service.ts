import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { Article } from './entities/article.entity';
import { convertDTO, slugify } from '@src/utils/common.util';
import { ARTICLE_MESSAGES } from './common/articles.constant';
import { ArticleTag } from '@modules/article-tags/entities/article-tag.entity';
import { ArticleCategory } from '@modules/article-categories/entities/article-category.entity';
import { User } from '@modules/users/entities/user.entity';
import { PaginationDto } from '@src/modules/pagination/dto/pagination.dto';
import { PaginationService } from '@modules/pagination/pagination.service';
import { ArticleGetAllParamsDto } from './dto/article-getall.dto';

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

    const article = await this.articleRepository.save(newArticle);
    article.slug = slugify(article.title, article.id);
    return article;
  }

  async findAll(
    params: ArticleGetAllParamsDto,
    onlyPublished = true,
  ): Promise<PaginationDto<Article>> {
    const query = this.articleRepository
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
        'commentParent',
        'commentChildren',
      ])
      .leftJoin('article.category', 'category')
      .leftJoin('article.tags', 'tag')
      .leftJoin('article.comments', 'comment')
      .leftJoin('article.author', 'author')
      .leftJoin('comment.user', 'commentUser')
      .leftJoin('comment.parent', 'commentParent')
      .leftJoin('comment.children', 'commentChildren')
      .take(params.limit)
      .skip((params.page - 1) * params.limit)
      .orderBy('article.createdAt', 'DESC');

    if (onlyPublished) {
      query.andWhere('article.published = true');
    }
    if (params.search) {
      query.andWhere('article.title LIKE :search', { search: `%${params.search}%` });
    }
    if (params.category) {
      query.andWhere('category.id = :categoryId', { categoryId: params.category });
    }
    if (params.tags?.length) {
      query.andWhere('tag.id IN (:tagIds)', { tagIds: params.tags });
    }

    const result = await query.getManyAndCount();
    const total = result[1];
    const articles = result[0].map((article) => ({
      ...article,
      slug: slugify(article.title, article.id),
    }));

    return this.paginationService.paginate(params, articles, total);
  }

  async findOne(id: number, onlyPublished = true) {
    const query = this.articleRepository
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
        'commentParent',
        'commentChildren',
      ])
      .leftJoin('article.category', 'category')
      .leftJoin('article.tags', 'tag')
      .leftJoin('article.comments', 'comment')
      .leftJoin('article.author', 'author')
      .leftJoin('comment.user', 'commentUser')
      .leftJoin('comment.parent', 'commentParent')
      .leftJoin('comment.children', 'commentChildren')
      .where('article.id = :id', { id });

    if (onlyPublished) {
      query.andWhere('article.published = true');
    }
    const article = await query.getOne();
    if (!article) throw new NotFoundException(ARTICLE_MESSAGES.NOT_FOUND);

    article.slug = slugify(article.title, article.id);
    return article;
  }

  async findRelateds(articleId: number, onlyPublished = true): Promise<Article[]> {
    const article = await this.findOne(articleId, onlyPublished);
    const authorId = article.author.id;

    const articles = await this.articleRepository
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
        'commentParent',
        'commentChildren',
      ])
      .leftJoin('article.category', 'category')
      .leftJoin('article.tags', 'tag')
      .leftJoin('article.comments', 'comment')
      .leftJoin('article.author', 'author')
      .leftJoin('comment.user', 'commentUser')
      .leftJoin('comment.parent', 'commentParent')
      .leftJoin('comment.children', 'commentChildren')
      .where('author.id = :authorId', { authorId })
      .andWhere('article.id != :articleId', { articleId })
      .andWhere('article.published = true')
      .take(3)
      .orderBy('article.createdAt', 'DESC')
      .getMany();

    return articles;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    let article = await this.articleRepository.findOne(id);
    if (!article) throw new NotFoundException(ARTICLE_MESSAGES.NOT_FOUND);
    convertDTO(updateArticleDto, article);

    // Reinsert article category
    article.category = await this.articleCategoryRepository.findOne(updateArticleDto.category);
    if (!article.category) {
      throw new BadRequestException(ARTICLE_MESSAGES.INVALID_CATEGORY);
    }

    // Reinsert article tags
    article.tags = await this.articleTagRepository.findByIds(updateArticleDto.tags);

    article = await this.articleRepository.save(article);
    article.slug = slugify(article.title, article.id);
    return article;
  }

  async changePublished(id: number, published = false) {
    const article = await this.articleRepository.findOne(id);
    if (!article) throw new NotFoundException(ARTICLE_MESSAGES.NOT_FOUND);

    article.published = published;

    return this.articleRepository.save(article);
  }

  async remove(id: number) {
    const result = await this.articleRepository.delete(id);
    if (result.affected) throw new NotFoundException(ARTICLE_MESSAGES.NOT_FOUND);

    return result;
  }
}
