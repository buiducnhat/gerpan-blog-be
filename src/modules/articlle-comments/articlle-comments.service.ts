import { Injectable } from '@nestjs/common';
import { CreateArticlleCommentDto } from './dto/create-articlle-comment.dto';
import { UpdateArticlleCommentDto } from './dto/update-articlle-comment.dto';

@Injectable()
export class ArticlleCommentsService {
  create(createArticlleCommentDto: CreateArticlleCommentDto) {
    return 'This action adds a new articlleComment';
  }

  findAll() {
    return `This action returns all articlleComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articlleComment`;
  }

  update(id: number, updateArticlleCommentDto: UpdateArticlleCommentDto) {
    return `This action updates a #${id} articlleComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} articlleComment`;
  }
}
