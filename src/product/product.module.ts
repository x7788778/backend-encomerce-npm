import { Module, forwardRef } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { RabbitExampleModule } from "../rabbit/rabbit.module";
import { ConsumersModule } from '../consumers/consumers.module';
// import {ProductConsumersService} from '../consumers/consumers.service';
@Module({
  imports: [
    // forwardRef(() => ConsumersModule),
    ConsumersModule,
    RabbitExampleModule,
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
  ],
  exports: [ProductService, TypeOrmModule, 'REDIS_CLIENT']
})
export class ProductModule {}
