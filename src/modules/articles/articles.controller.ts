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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { BasicArticleDto } from './dto/article-basic.dto';
import { ARTICLE_MESSAGES } from './common/articles.constant';
import {
  MyApiForbiddenResponse,
  MyApiNotFoundResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';
import { DetailArticleCategoryDto } from './dto/article-detail.dto';

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
  create(@Body(new ValidationPipe()) createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_MESSAGES.SUCCESS,
    type: [BasicArticleDto],
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_MESSAGES.SUCCESS,
    type: DetailArticleCategoryDto,
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an article',
    description: 'Update an article (required admin permission)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
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
  @ApiResponse({
    status: HttpStatus.OK,
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
