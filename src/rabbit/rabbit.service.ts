import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessagingService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async publish(exchange,routingKey,message: string) {
    // this.amqpConnection.publish("products_exchange", "pruducts_findall", message);
    this.amqpConnection.publish(exchange, routingKey, message);
  }
}