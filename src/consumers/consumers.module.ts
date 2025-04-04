import { Module } from '@nestjs/common';
import { ProductConsumersService } from './consumers.service';
// import { ProductConsumersService } from './consumers.service';
import { RabbitExampleModule } from '../rabbit/rabbit.module';
@Module({
  imports: [RabbitExampleModule],
  providers: [ProductConsumersService],
  exports:[ConsumersModule]
})
export class ConsumersModule {}
