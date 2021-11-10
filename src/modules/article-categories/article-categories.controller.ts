import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@src/decorators/roles.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { UserRole } from '@modules/users/enums/role.enum';
import { ArticleCategoriesService } from './article-categories.service';
import { CreateArticleCategoryDto } from './dto/article-category-create.dto';
import { UpdateArticleCategoryDto } from './dto/article-category-update.dto';
import { BasicArticleCategoryDto } from './dto/article-category-basic.dto';
import { ARTICLE_CATEGORY_MESSAGES } from './common/article-categories.constant';
import {
  MyApiForbiddenResponse,
  MyApiNotFoundResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';
import { DetailArticleCategoryDto } from './dto/article-category-detail.dto';

@ApiTags('Article Categories')
@Controller('articles/categories')
export class ArticleCategoriesController {
  constructor(private readonly articleCategoriesService: ArticleCategoriesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create article category',
    description: 'Create article category (required admin permission)',
  })
  @ApiCreatedResponse({
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
    type: BasicArticleCategoryDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body(new ValidationPipe()) createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoriesService.create(createArticleCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all article categories' })
  @ApiOkResponse({
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
    type: [DetailArticleCategoryDto],
  })
  findAll() {
    return this.articleCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article category' })
  @ApiOkResponse({
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
    type: DetailArticleCategoryDto,
  })
  @MyApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleCategoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an article category',
    description: 'Update an article category (required admin permission)',
  })
  @ApiOkResponse({
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
    type: BasicArticleCategoryDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @MyApiNotFoundResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoriesService.update(id, updateArticleCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an article category',
    description: 'Delete an article category (required admin permission)',
  })
  @ApiOkResponse({
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
  })
  @MyApiNotFoundResponse()
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articleCategoriesService.remove(id);
  }
}
