"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductConsumersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
// import { ProductService } from '../product/product.service';
const order_service_1 = require("../order/order.service");
let ProductConsumersService = exports.ProductConsumersService = class ProductConsumersService {
    constructor(amqpConnection, orderService) {
        this.amqpConnection = amqpConnection;
        this.orderService = orderService;
    }
    async onModuleInit() {
        if (this.amqpConnection.connected) {
            console.log('RabbitMQ connection established');
        }
        else {
            console.log('RabbitMQ connection not established');
        }
    }
    async findAllFromQueue(message) {
        console.log('Received message from RabbitMQ:', message);
        // 处理来自 RabbitMQ 的消息
        return { status: 'success', data: message };
    }
    async createdFromQueue(message) {
        console.log('Received message from RabbitMQ and created:', message);
        // 处理来自 RabbitMQ 的消息
        return { status: 'success', data: message };
    }
    async handleOrderCreation(message) {
        console.log('Received order creation message:', message);
        this.orderService.saveOrderToDatabase(message);
        // 处理订单创建消息
        return { status: 'success', data: message };
    }
};
__decorate([
    (0, nestjs_rabbitmq_1.RabbitRPC)({
        exchange: 'products_exchange',
        routingKey: 'products_findall',
        queue: 'products_findall',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductConsumersService.prototype, "findAllFromQueue", null);
__decorate([
    (0, nestjs_rabbitmq_1.RabbitRPC)({
        exchange: 'products_exchange',
        routingKey: 'products_created',
        queue: 'products_created',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductConsumersService.prototype, "createdFromQueue", null);
__decorate([
    (0, nestjs_rabbitmq_1.RabbitRPC)({
        exchange: 'orders_exchange',
        routingKey: 'orders_created',
        queue: 'orders_created'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductConsumersService.prototype, "handleOrderCreation", null);
exports.ProductConsumersService = ProductConsumersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection,
        order_service_1.OrderService])
], ProductConsumersService);
//# sourceMappingURL=consumers.service.js.map