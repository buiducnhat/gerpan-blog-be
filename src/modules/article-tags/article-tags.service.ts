import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleTagDto } from './dto/article-tag-create.dto';
import { UpdateArticleTagDto } from './dto/article-tag-update.dto';
import { ArticleTag } from './entities/article-tag.entity';
import { convertDTO } from '@src/utils/common.util';
import { ARTICLE_TAGS_MESSAGES } from './common/article-tags.constant';

@Injectable()
export class ArticleTagsService {
  constructor(
    @InjectRepository(ArticleTag)
    private articleTagRepository: Repository<ArticleTag>,
  ) {}

  create(createArticleTagDto: CreateArticleTagDto) {
    const newArticleTag = new ArticleTag();
    convertDTO(createArticleTagDto, newArticleTag);

    return this.articleTagRepository.save(newArticleTag);
  }

  findAll() {
    return this.articleTagRepository.find();
  }

  findOne(id: number) {
    return this.articleTagRepository.findOne(id);
  }

  async update(id: number, updateArticleTagDto: UpdateArticleTagDto) {
    const articleTag = await this.articleTagRepository.findOne(id);
    if (!articleTag) throw new NotFoundException(ARTICLE_TAGS_MESSAGES.NOT_FOUND);

    convertDTO(updateArticleTagDto, articleTag);
    return this.articleTagRepository.save(articleTag);
  }

  async remove(id: number) {
    const result = await this.articleTagRepository.delete(id);
    if (result.affected) throw new NotFoundException(ARTICLE_TAGS_MESSAGES.NOT_FOUND);

    return result;
  }
}
