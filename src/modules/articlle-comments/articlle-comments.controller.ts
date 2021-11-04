import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlleCommentsService } from './articlle-comments.service';
import { CreateArticlleCommentDto } from './dto/create-articlle-comment.dto';
import { UpdateArticlleCommentDto } from './dto/update-articlle-comment.dto';

@Controller('articlle-comments')
export class ArticlleCommentsController {
  constructor(private readonly articlleCommentsService: ArticlleCommentsService) {}

  @Post()
  create(@Body() createArticlleCommentDto: CreateArticlleCommentDto) {
    return this.articlleCommentsService.create(createArticlleCommentDto);
  }

  @Get()
  findAll() {
    return this.articlleCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlleCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticlleCommentDto: UpdateArticlleCommentDto) {
    return this.articlleCommentsService.update(+id, updateArticlleCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlleCommentsService.remove(+id);
  }
}
