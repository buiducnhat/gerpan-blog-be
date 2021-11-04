import { PartialType } from '@nestjs/swagger';
import { CreateArticlleCommentDto } from './create-articlle-comment.dto';

export class UpdateArticlleCommentDto extends PartialType(CreateArticlleCommentDto) {}
