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
import { ArticleTagsService } from './article-tags.service';
import { CreateArticleTagDto } from './dto/article-tag-create.dto';
import { UpdateArticleTagDto } from './dto/article-tag-update.dto';
import { BasicArticleTagDto } from './dto/article-tag-basic.dto';
import { ARTICLE_TAGS_MESSAGES } from './common/article-tags.constant';
import { MyApiForbiddenResponse } from '@src/decorators/swagger-extend.decorator';

@ApiTags('Article Tags')
@Controller('article-tags')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create article tag',
    description: 'Create article tag (required admin permission)',
  })
  @ApiCreatedResponse({ description: ARTICLE_TAGS_MESSAGES.SUCCESS, type: BasicArticleTagDto })
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body(new ValidationPipe()) createArticleTagDto: CreateArticleTagDto) {
    return this.articleTagsService.create(createArticleTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all article tags' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
    type: [BasicArticleTagDto],
  })
  findAll() {
    return this.articleTagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article tag' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
    type: BasicArticleTagDto,
  })
  findOne(@Param('id') id: string) {
    return this.articleTagsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an article tag',
    description: 'Update an article tag (required admin permission)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
    type: BasicArticleTagDto,
  })
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateArticleTagDto: UpdateArticleTagDto,
  ) {
    return this.articleTagsService.update(+id, updateArticleTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an article tag',
    description: 'Delete an article tag (required admin permission)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_TAGS_MESSAGES.SUCCESS,
  })
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.articleTagsService.remove(+id);
  }
}
