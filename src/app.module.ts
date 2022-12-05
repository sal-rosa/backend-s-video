import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import * as dotenv from 'dotenv';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

import { User } from './user/user.model';
import {Post} from './post/post.model';

dotenv.config();

@Module({
  imports: [UserModule, AuthModule, PostModule, 
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      models: [User, Post],
      autoLoadModels: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
