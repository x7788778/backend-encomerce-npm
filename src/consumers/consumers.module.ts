import { Module } from '@nestjs/common';
import { ProductConsumersService } from './consumers.service';
// import { ProductConsumersService } from './consumers.service';
import { RabbitExampleModule } from '../rabbit/rabbit.module';
// import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';
@Module({
  imports: [RabbitExampleModule, OrderModule],
  providers: [ProductConsumersService],
  exports:[ConsumersModule]
})
export class ConsumersModule {}
