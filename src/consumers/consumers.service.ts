import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitRPC, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
// import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
@Injectable()
export class ProductConsumersService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly orderService: OrderService,

    ) { }
    async onModuleInit() {
        if (this.amqpConnection.connected) {
            console.log('RabbitMQ connection established');
        } else {
            console.log('RabbitMQ connection not established');
        }
    }
    @RabbitRPC({
        exchange: 'products_exchange',
        routingKey: 'products_findall',
        queue: 'products_findall',
    })
    async findAllFromQueue(message: any) {
        console.log('Received message from RabbitMQ:', message);
        // 处理来自 RabbitMQ 的消息
        return { status: 'success', data: message };
    }
    @RabbitRPC({
        exchange: 'products_exchange',
        routingKey: 'products_created',
        queue: 'products_created',
    })
    async createdFromQueue(message: any) {
        console.log('Received message from RabbitMQ and created:', message);
        // 处理来自 RabbitMQ 的消息
        return { status: 'success', data: message };
    }

    @RabbitRPC({
        exchange: 'orders_exchange',
        routingKey: 'orders_created',
        queue: 'orders_created'
    })
    async handleOrderCreation(message: any) {
        console.log('Received order creation message:', message);
        this.orderService.saveOrderToDatabase(message);
        // 处理订单创建消息
        return { status: 'success', data: message };
    }

}