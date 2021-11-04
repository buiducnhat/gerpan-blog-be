import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
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
@Controller('article-categories')
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
    type: [DetailArticleCategoryDto],
  })
  findAll() {
    return this.articleCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article category' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
    type: DetailArticleCategoryDto,
  })
  findOne(@Param('id') id: string) {
    return this.articleCategoriesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an article category',
    description: 'Update an article category (required admin permission)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
    type: BasicArticleCategoryDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  // @ApiNotFoundResponse({ type: NotFoundResponse })
  @MyApiNotFoundResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoriesService.update(+id, updateArticleCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an article category',
    description: 'Delete an article category (required admin permission)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_CATEGORY_MESSAGES.SUCCESS,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.articleCategoriesService.remove(+id);
  }
}
