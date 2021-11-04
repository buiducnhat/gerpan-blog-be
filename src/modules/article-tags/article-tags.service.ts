import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleTagDto } from './dto/create-article-tag.dto';
import { UpdateArticleTagDto } from './dto/update-article-tag.dto';
import { ArticleTag } from './entities/article-tag.entity';
import { convertDTO, slugify } from '@src/utils/common.util';

@Injectable()
export class ArticleTagsService {
  constructor(
    @InjectRepository(ArticleTag)
    private articleTagService: Repository<ArticleTag>,
  ) {}

  create(createArticleTagDto: CreateArticleTagDto) {
    const newArticleTag = new ArticleTag();
    convertDTO(createArticleTagDto, newArticleTag);

    return this.articleTagService.save(newArticleTag);
  }

  findAll() {
    return `This action returns all articleTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articleTag`;
  }

  update(id: number, updateArticleTagDto: UpdateArticleTagDto) {
    return `This action updates a #${id} articleTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} articleTag`;
  }
}
