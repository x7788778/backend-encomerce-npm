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
        }
      ],
      uri: "amqp://guest:guest@127.0.0.1:5672",
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: true },
    }),
  ],
  providers: [MessagingService],
  exports: [MessagingService, RabbitMQModule],
})
export class RabbitExampleModule {}
