import { BasicArticleCategoryDto } from './article-category-basic.dto';

export class DetailArticleCategoryDto extends BasicArticleCategoryDto {
  parent: BasicArticleCategoryDto;
  children: BasicArticleCategoryDto[];
}
