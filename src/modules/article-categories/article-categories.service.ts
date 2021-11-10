import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { CreateArticleCategoryDto } from './dto/article-category-create.dto';
import { UpdateArticleCategoryDto } from './dto/article-category-update.dto';
import { ArticleCategory } from './entities/article-category.entity';
import { convertDTO } from '@src/utils/common.util';
import { ARTICLE_CATEGORY_MESSAGES } from './common/article-categories.constant';

@Injectable()
export class ArticleCategoriesService {
  constructor(
    @InjectRepository(ArticleCategory)
    private articleCategoryRepository: Repository<ArticleCategory>,
  ) {}

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {
    const newArticleCategory = new ArticleCategory();
    newArticleCategory.children = [];
    convertDTO(_.omit(createArticleCategoryDto, ['parentId']), newArticleCategory);

    if (createArticleCategoryDto.parentId) {
      const parent = await this.articleCategoryRepository.findOne(
        createArticleCategoryDto.parentId,
      );
      if (!parent) {
        throw new BadRequestException(ARTICLE_CATEGORY_MESSAGES.INVALID_PARENT);
      } else {
        if (createArticleCategoryDto.level >= parent.level) {
          throw new BadRequestException(ARTICLE_CATEGORY_MESSAGES.INVALID_PARENT);
        }
        newArticleCategory.parent = parent;
      }
    }

    return this.articleCategoryRepository.save(newArticleCategory);
  }

  findAll() {
    return this.articleCategoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children')
      .getMany();
  }

  async findOne(id: number) {
    const articleCategory = await this.articleCategoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children')
      .where('category.id = :id', { id })
      .getOne();

    if (!articleCategory) {
      throw new NotFoundException(ARTICLE_CATEGORY_MESSAGES.NOT_FOUND);
    }
    return articleCategory;
  }

  async update(id: number, updateArticleCategoryDto: UpdateArticleCategoryDto) {
    const articleCategory = await this.articleCategoryRepository.findOne(id);
    if (!articleCategory) {
      throw new NotFoundException(ARTICLE_CATEGORY_MESSAGES.NOT_FOUND);
    }
    convertDTO(updateArticleCategoryDto, articleCategory);
    return this.articleCategoryRepository.save(articleCategory);
  }

  async remove(id: number) {
    const articleCategory = await this.findOne(id);
    if (!articleCategory) {
      throw new NotFoundException(ARTICLE_CATEGORY_MESSAGES.NOT_FOUND);
    }
    if (articleCategory.children.length > 0) {
      throw new BadRequestException(ARTICLE_CATEGORY_MESSAGES.HAS_CHILDREN_ERROR);
    }

    return this.articleCategoryRepository.delete(id);
  }
}
