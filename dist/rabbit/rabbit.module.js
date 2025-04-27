"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitExampleModule = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const rabbit_service_1 = require("./rabbit.service");
let RabbitExampleModule = exports.RabbitExampleModule = class RabbitExampleModule {
};
exports.RabbitExampleModule = RabbitExampleModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot({
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
                uri: "amqp://guest:guest@127.0.0.1:5672",
                enableControllerDiscovery: true,
                connectionInitOptions: { wait: true },
            }),
        ],
        providers: [rabbit_service_1.MessagingService],
        exports: [rabbit_service_1.MessagingService, nestjs_rabbitmq_1.RabbitMQModule],
    })
], RabbitExampleModule);
//# sourceMappingURL=rabbit.module.js.map