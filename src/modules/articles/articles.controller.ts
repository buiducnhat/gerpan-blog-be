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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@src/decorators/roles.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { UserRole } from '@modules/users/enums/role.enum';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { BasicArticleDto } from './dto/article-basic.dto';
import { ARTICLE_CONFIGS, ARTICLE_MESSAGES } from './common/articles.constant';
import {
  MyApiForbiddenResponse,
  MyApiNotFoundResponse,
  MyApiPaginatedResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';
import { DetailArticleDto } from './dto/article-detail.dto';
import { Article } from './entities/article.entity';
import { AuthUser } from '@src/decorators/auth-user.decorator';
import { User } from '@modules/users/entities/user.entity';
import { PaginationDto } from '@modules/pagination/dto/pagination.dto';
import { IsInRoles } from '@src/decorators/is-in-roles.decorator';
import { JwtOptionalAuthGuard } from '@modules/auth/guards/jwt-optional-auth.guard';
import { ChangePublishedAticleDto } from './dto/article-change-published.dto';
import { MyApiArticleGetAllQuery } from './decorators/article-query.decorator';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create article',
    description: 'Create article (required admin permission)',
  })
  @ApiCreatedResponse({
    description: ARTICLE_MESSAGES.SUCCESS,
    type: BasicArticleDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body(new ValidationPipe()) createArticleDto: CreateArticleDto, @AuthUser() user: User) {
    return this.articlesService.create(createArticleDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all articles',
    description:
      `Return only published articles for user and all article for admin.` +
      `Limit is ${ARTICLE_CONFIGS.MAX_ITEM_LIMIT} items`,
  })
  @MyApiPaginatedResponse(BasicArticleDto, { description: ARTICLE_MESSAGES.SUCCESS })
  @MyApiArticleGetAllQuery()
  @ApiBearerAuth()
  @UseGuards(JwtOptionalAuthGuard)
  async findAll(
    @Query('category', new DefaultValuePipe(0), ParseIntPipe) category = 0,
    @Query('tags', new ParseArrayPipe({ items: Number, optional: true })) tags = [],
    @Query('page', new DefaultValuePipe(ARTICLE_CONFIGS.DEFAULT_PAGE), ParseIntPipe)
    page = ARTICLE_CONFIGS.DEFAULT_PAGE,
    @Query('limit', new DefaultValuePipe(ARTICLE_CONFIGS.MAX_ITEM_LIMIT), ParseIntPipe)
    limit = ARTICLE_CONFIGS.DEFAULT_ITEM_LIMIT,
    @Query('search', new DefaultValuePipe('')) search = '',
    @IsInRoles([UserRole.ADMIN]) isAdmin: boolean,
  ): Promise<PaginationDto<Article>> {
    limit = Math.min(limit, ARTICLE_CONFIGS.MAX_ITEM_LIMIT);
    return this.articlesService.findAll({ page, limit, search, category, tags }, !isAdmin);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article' })
  @ApiOkResponse({
    description: ARTICLE_MESSAGES.SUCCESS,
    type: DetailArticleDto,
  })
  @MyApiNotFoundResponse()
  @ApiBearerAuth()
  @UseGuards(JwtOptionalAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @IsInRoles([UserRole.ADMIN]) isAdmin: boolean) {
    return this.articlesService.findOne(id, !isAdmin);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related articles' })
  @ApiOkResponse({
    description: ARTICLE_MESSAGES.SUCCESS,
    type: DetailArticleDto,
  })
  @MyApiNotFoundResponse()
  @UseGuards(JwtOptionalAuthGuard)
  findRelateds(
    @Param('id', ParseIntPipe) id: number,
    @IsInRoles([UserRole.ADMIN]) isAdmin: boolean,
  ) {
    return this.articlesService.findRelateds(id, !isAdmin);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an article',
    description: 'Update an article (required admin permission)',
  })
  @ApiOkResponse({
    description: ARTICLE_MESSAGES.SUCCESS,
    type: BasicArticleDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @MyApiNotFoundResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Put('publish/:id')
  @ApiOperation({
    summary: 'Change publish status for an article',
    description: 'Required admin permission',
  })
  @ApiOkResponse({
    description: ARTICLE_MESSAGES.SUCCESS,
    type: null,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @MyApiNotFoundResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  changePublished(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) changePublishedAticleDto: ChangePublishedAticleDto,
  ) {
    return this.articlesService.changePublished(id, changePublishedAticleDto.published);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an article',
    description: 'Delete an article (required admin permission)',
  })
  @ApiOkResponse({
    description: ARTICLE_MESSAGES.SUCCESS,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
