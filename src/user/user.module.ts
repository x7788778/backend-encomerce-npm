import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard' ;
import { RedisTestService } from '../redis-test.service';
@Module({
  imports: [TypeOrmModule.forFeature([User])],//会自动将User实体与数据库进行关联,将User注入到容器中
  providers: [UserService,RedisTestService],
  controllers: [UserController],
  exports : [ UserService ,TypeOrmModule], // 如果其他模块需要使用UserService，可以导出
})
export class UserModule {}
