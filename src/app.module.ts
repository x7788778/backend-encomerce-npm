// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // 使用SQLite作为示例数据库，生产环境可更换为MySQL等
      database: 'db.sqlite',
      entities: [User],
      synchronize: true, // 自动同步数据库结构（注意：仅用于开发环境）
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
