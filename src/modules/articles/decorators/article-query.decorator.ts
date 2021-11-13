import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ArticleGetAllParamsDto } from '../dto/article-getall.dto';

export const MyApiArticleGetAllQuery = () =>
  applyDecorators(ApiQuery({ type: ArticleGetAllParamsDto }));
