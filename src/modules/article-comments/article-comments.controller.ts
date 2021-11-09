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
  ParseIntPipe,
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
import { ArticleCommentsService } from './article-comments.service';
import { CreateArticleCommentDto } from './dto/article-comment-create.dto';
import { UpdateArticleCommentDto } from './dto/article-comment-update.dto';
import { BasicArticleCommentDto } from './dto/article-comment-basic.dto';
import { ARTICLE_COMMENTS_MESSAGES } from './common/article-comments.constant';
import {
  MyApiForbiddenResponse,
  MyApiUnauthorizedResponse,
} from '@src/decorators/swagger-extend.decorator';
import { AuthUser } from '@src/decorators/auth-user.decorator';
import { User } from '@modules/users/entities/user.entity';

@ApiTags('Article Comments')
@Controller('articles/:articleId/comments')
export class ArticleCommentsController {
  constructor(private readonly articleCommentsService: ArticleCommentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create article comment',
    description: 'Create a comment for an article',
  })
  @ApiCreatedResponse({
    description: ARTICLE_COMMENTS_MESSAGES.SUCCESS,
    type: BasicArticleCommentDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Param('articleId', ParseIntPipe) articleId: number,
    @AuthUser() user: User,
    @Body(new ValidationPipe()) createArticleCommentDto: CreateArticleCommentDto,
  ) {
    return this.articleCommentsService.create(createArticleCommentDto, user, articleId);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an article comment',
    description: 'Update an article comment (required owner)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_COMMENTS_MESSAGES.SUCCESS,
    type: BasicArticleCommentDto,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateArticleCommentDto: UpdateArticleCommentDto,
  ) {
    return this.articleCommentsService.update(+id, updateArticleCommentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an article comment',
    description: 'Delete an article comment (required owner)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ARTICLE_COMMENTS_MESSAGES.SUCCESS,
  })
  @MyApiUnauthorizedResponse()
  @MyApiForbiddenResponse()
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.articleCommentsService.remove(+id);
  }
}
