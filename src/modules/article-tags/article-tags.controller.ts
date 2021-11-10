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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@src/decorators/roles.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { UserRole } from '@modules/users/enums/role.enum';
import { ArticleTagsService } from './article-tags.service';
import { CreateArticleTagDto } from './dto/article-tag-create.dto';
import { UpdateArticleTagDto } from './dto/article-tag-update.dto';
import { BasicArticleTagDto } from './dto/article-tag-basic.dto';
import { ARTICLE_TAGS_MESSAGES } from './common/article-tags.constant';
import {
  MyApiForbiddenResponse,
  MyApiNotFoundResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';

@ApiTags('Article Tags')
@Controller('articles/tags')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create article tag',
    description: 'Create article tag (required admin permission)',
  })
  @ApiCreatedResponse({ description: ARTICLE_TAGS_MESSAGES.SUCCESS, type: BasicArticleTagDto })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body(new ValidationPipe()) createArticleTagDto: CreateArticleTagDto) {
    return this.articleTagsService.create(createArticleTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all article tags' })
  @ApiOkResponse({
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
    type: [BasicArticleTagDto],
  })
  findAll() {
    return this.articleTagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article tag' })
  @ApiOkResponse({
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
    type: BasicArticleTagDto,
  })
  @MyApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleTagsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an article tag',
    description: 'Update an article tag (required admin permission)',
  })
  @ApiOkResponse({
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
    type: BasicArticleTagDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @MyApiNotFoundResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateArticleTagDto: UpdateArticleTagDto,
  ) {
    return this.articleTagsService.update(id, updateArticleTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an article tag',
    description: 'Delete an article tag (required admin permission)',
  })
  @ApiOkResponse({
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @MyApiNotFoundResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articleTagsService.remove(id);
  }
}
