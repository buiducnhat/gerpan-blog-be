import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER } from '@nestjs/core';

import { AllExceptionsFilter } from '@src/filters/exception.filter';
import { DatabaseModule } from '@src/database/database.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { HealthController } from '@modules/health-check/health-check.controller';
import { ArticlesModule } from '@modules/articles/articles.module';
import { ArticleCategoriesModule } from '@modules/article-categories/article-categories.module';
import { ArticleTagsModule } from '@modules/article-tags/article-tags.module';
import { PaginationModule } from '@modules/pagination/pagination.module';
import { ArticleCommentsModule } from '@modules/article-comments/article-comments.module';
import { AppController } from './app.controller';
import appConfig from '@configs/app.config';
import databaseConfig from '@configs/database.config';
import authConfig from '@configs/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    DatabaseModule,
    TerminusModule,
    UsersModule,
    AuthModule,
    PaginationModule,
    ArticleCategoriesModule,
    ArticleTagsModule,
    ArticleCommentsModule,
    ArticlesModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [AppController, HealthController],
})
export class AppModule {}
