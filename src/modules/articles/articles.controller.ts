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
import { ARTICLE_MESSAGES } from './common/articles.constant';
import {
  MyApiForbiddenResponse,
  MyApiNotFoundResponse,
  MyApiPaginatedQuery,
  MyApiPaginatedResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';
import { DetailArticleDto } from './dto/article-detail.dto';
import { Article } from './entities/article.entity';
import { AuthUser } from '@src/decorators/auth-user.decorator';
import { User } from '@modules/users/entities/user.entity';
import { PaginationDto } from '@modules/pagination/dto/pagination.dto';

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
  @ApiOperation({ summary: 'Get all published articles' })
  @MyApiPaginatedResponse(BasicArticleDto, { description: ARTICLE_MESSAGES.SUCCESS })
  @MyApiPaginatedQuery()
  async findPublished(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<PaginationDto<Article>> {
    limit = Math.min(limit, 100);
    return this.articlesService.findAll({ page, limit });
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all articles', description: 'Required admin permission' })
  @MyApiPaginatedResponse(BasicArticleDto, { description: ARTICLE_MESSAGES.SUCCESS })
  @MyApiPaginatedQuery()
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<PaginationDto<Article>> {
    limit = Math.min(limit, 100);
    return this.articlesService.findAll({ page, limit }, false);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article' })
  @ApiOkResponse({
    description: ARTICLE_MESSAGES.SUCCESS,
    type: DetailArticleDto,
  })
  @MyApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
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
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
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
