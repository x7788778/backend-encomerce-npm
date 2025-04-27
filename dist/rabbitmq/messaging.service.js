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
exports.MessagingService = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
let MessagingService = exports.MessagingService = class MessagingService {
    constructor(amqpConnection) {
        this.amqpConnection = amqpConnection;
    }
    async onModuleInit() {
        const maxRetries = 5;
        const retryDelay = 3000; // 3秒
        // 确保amqpConnection已初始化
        if (!this.amqpConnection) {
            throw new Error('RabbitMQ connection not initialized');
        }
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                // 检查连接状态
                if (this.amqpConnection?.connected) {
                    console.log('RabbitMQ connection established successfully');
                    break;
                }
                console.log(`Attempt ${attempt}/${maxRetries}: Waiting for RabbitMQ connection...`);
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                }
                else {
                    throw new Error('Failed to establish RabbitMQ connection after maximum retries');
                }
            }
            catch (error) {
                console.error(`RabbitMQ connection attempt ${attempt} failed:`, error);
                if (attempt === maxRetries) {
                    throw new Error(`Failed to connect to RabbitMQ after ${maxRetries} attempts`);
                }
            }
        }
        // 添加连接监听器
        if (this.amqpConnection.managedConnection) {
            this.amqpConnection.managedConnection.on('connect', () => {
                console.log('RabbitMQ connected');
            });
            this.amqpConnection.managedConnection.on('disconnect', (err) => {
                console.error('RabbitMQ disconnected', err);
            });
        }
    }
    async publish(exchange, routingKey, message) {
        if (!this.amqpConnection.connected) {
            throw new Error('RabbitMQ not connected');
        }
        console.log('Publishing message to RabbitMQ:', { exchange, routingKey, message });
        await this.amqpConnection.publish(exchange, routingKey, message);
    }
};
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map