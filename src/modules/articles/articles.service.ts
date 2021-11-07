import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { Article } from './entities/article.entity';
import { convertDTO } from '@src/utils/common.util';
import { ARTICLE_MESSAGES } from './common/articles.constant';
import { ArticleTag } from '../article-tags/entities/article-tag.entity';
import { ArticleComment } from './entities/articlle-comment.entity';
import { ArticleCategory } from '../article-categories/entities/article-category.entity';

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
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = new Article();
    convertDTO(createArticleDto, newArticle);

    // Insert article category
    newArticle.category = await this.articleCategoryRepository.findOne(createArticleDto.category);
    if (!newArticle.category) {
      throw new BadRequestException(ARTICLE_MESSAGES.INVALID_CATEGORY);
    }

    // Insert article tags
    newArticle.tags = await this.articleTagRepository.findByIds(createArticleDto.tags);

    return this.articleRepository.save(newArticle);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Article>> {
    return paginate<Article>(this.articleRepository, options);
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne(id);

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
