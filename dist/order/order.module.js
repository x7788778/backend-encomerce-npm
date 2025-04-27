"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./order.entity");
const user_entity_1 = require("../user/user.entity");
const product_entity_1 = require("../product/product.entity");
let OrderModule = exports.OrderModule = OrderModule_1 = class OrderModule {
};
exports.OrderModule = OrderModule = OrderModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, user_entity_1.User, product_entity_1.Product]),
        ],
        providers: [order_service_1.OrderService],
        controllers: [order_controller_1.OrderController],
        exports: [order_service_1.OrderService, typeorm_1.TypeOrmModule, OrderModule_1],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map