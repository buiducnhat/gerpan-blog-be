import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { CreateArticleCategoryDto } from './dto/article-category-create.dto';
import { UpdateArticleCategoryDto } from './dto/article-category-update.dto';
import { ArticleCategory } from './entities/article-category.entity';
import { convertDTO } from '@src/utils/common.util';

@Injectable()
export class ArticleCategoriesService {
  constructor(
    @InjectRepository(ArticleCategory)
    private articleCategoryRepository: Repository<ArticleCategory>,
  ) {}

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {
    const newArticleCategory = new ArticleCategory();
    convertDTO(_.omit(createArticleCategoryDto, ['parentId']), newArticleCategory);

    if (createArticleCategoryDto.parentId) {
      const parent = await this.articleCategoryRepository.findOne(
        createArticleCategoryDto.parentId,
      );
      if (!parent) {
        throw new BadRequestException('Invalid parent category');
      } else {
        newArticleCategory.parent = parent;
      }
    }

    return this.articleCategoryRepository.save(newArticleCategory);
  }

  findAll() {
    return this.articleCategoryRepository.find();
  }

  findOne(id: number) {
    return this.articleCategoryRepository.findOne(id);
  }

  async update(id: number, updateArticleCategoryDto: UpdateArticleCategoryDto) {
    const articleCategory = await this.articleCategoryRepository.findOne(id);
    convertDTO(updateArticleCategoryDto, articleCategory);
    return this.articleCategoryRepository.save(articleCategory);
  }

  remove(id: number) {
    return this.articleCategoryRepository.delete(id);
  }
}
