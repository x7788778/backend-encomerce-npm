import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module,Global } from "@nestjs/common";
import { MessagingService } from "./rabbit.service";
@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: "products_exchange",
          type: "topic",
          createExchangeIfNotExists: true,
        },
        {
          name: "orders_exchange",
          type: "direct",
          createExchangeIfNotExists: true,
        }
      ],
      queues: [
        {
          name: 'orders_created',
          options: { durable: true },
        },
      ],
      uri: "amqp://rabbitmq",
      enableControllerDiscovery: true,
      connectionInitOptions: { 
        timeout: 15000,
        reject: false
      },
      defaultRpcTimeout: 30000,
      
    }),
  ],
  providers: [MessagingService],
  exports: [MessagingService, RabbitMQModule],
})
export class RabbitExampleModule {}
