import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],//会自动将User实体与数据库进行关联,将User注入到容器中
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
