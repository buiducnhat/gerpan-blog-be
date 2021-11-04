import { Global, Module } from '@nestjs/common';
import { LoggerService } from './custom-logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
