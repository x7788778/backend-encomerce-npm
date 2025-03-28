import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    RedisModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => new Redis('redis://localhost:6379')
    }
  ]
})
export class ProductModule {}
