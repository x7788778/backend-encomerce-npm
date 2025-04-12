import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order,User,Product]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService, TypeOrmModule,OrderModule],
})
export class OrderModule {}
