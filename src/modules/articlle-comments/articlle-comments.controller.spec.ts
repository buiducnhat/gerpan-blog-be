import { Test, TestingModule } from '@nestjs/testing';
import { ArticlleCommentsController } from './articlle-comments.controller';
import { ArticlleCommentsService } from './articlle-comments.service';

describe('ArticlleCommentsController', () => {
  let controller: ArticlleCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlleCommentsController],
      providers: [ArticlleCommentsService],
    }).compile();

    controller = module.get<ArticlleCommentsController>(ArticlleCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
