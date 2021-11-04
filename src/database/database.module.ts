import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IDatabaseConfig } from '@src/configs/database.config';
import { User } from '@modules/users/entities/user.entity';
import { Social } from '@modules/users/entities/social.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IDatabaseConfig>) => ({
        type: 'mysql',
        host: configService.get('dbHost'),
        port: configService.get('dbPort'),
        username: configService.get('dbUsername'),
        password: configService.get('dbPassword'),
        database: configService.get('dbName'),
        entities: [User, Social],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
