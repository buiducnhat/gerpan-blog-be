import { Test, TestingModule } from '@nestjs/testing';
import { ArticlleCommentsService } from './articlle-comments.service';

describe('ArticlleCommentsService', () => {
  let service: ArticlleCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlleCommentsService],
    }).compile();

    service = module.get<ArticlleCommentsService>(ArticlleCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
