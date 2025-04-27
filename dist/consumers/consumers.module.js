"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ConsumersModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumersModule = void 0;
const common_1 = require("@nestjs/common");
const consumers_service_1 = require("./consumers.service");
// import { ProductConsumersService } from './consumers.service';
const rabbit_module_1 = require("../rabbit/rabbit.module");
// import { ProductModule } from '../product/product.module';
const order_module_1 = require("../order/order.module");
let ConsumersModule = exports.ConsumersModule = ConsumersModule_1 = class ConsumersModule {
};
exports.ConsumersModule = ConsumersModule = ConsumersModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [rabbit_module_1.RabbitExampleModule, order_module_1.OrderModule],
        providers: [consumers_service_1.ProductConsumersService],
        exports: [ConsumersModule_1]
    })
], ConsumersModule);
//# sourceMappingURL=consumers.module.js.map