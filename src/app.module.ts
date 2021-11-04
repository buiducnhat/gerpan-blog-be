import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER } from '@nestjs/core';

import { LoggerModule } from './logger/custom-logger.module';
import { AllExceptionsFilter } from './filters/exception.filter';
import { DatabaseModule } from '@src/database/database.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { HealthController } from './modules/health-check/health-check.controller';
import appConfig from '@configs/app.config';
import databaseConfig from '@configs/database.config';
import authConfig from '@configs/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    LoggerModule,
    DatabaseModule,
    TerminusModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [HealthController],
})
export class AppModule {}
