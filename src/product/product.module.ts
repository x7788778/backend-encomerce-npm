import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
      useFactory: (configService: ConfigService) => new Redis(configService.get('REDIS_URL')),
      inject: [ConfigService]
    }
  ],
  exports: [ProductService, TypeOrmModule, 'REDIS_CLIENT']
})
export class ProductModule {}
