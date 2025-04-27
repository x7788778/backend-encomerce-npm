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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
// src/order/order.service.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const user_entity_1 = require("../user/user.entity");
const product_entity_1 = require("../product/product.entity");
const rabbit_service_1 = require("../rabbit/rabbit.service");
let OrderService = exports.OrderService = class OrderService {
    constructor(orderRepository, userRepository, productRepository, messagingService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.messagingService = messagingService;
    }
    async createOrder(userId, productId, quantity) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.stock < quantity) {
            throw new common_1.NotFoundException('Insufficient stock');
        }
        const totalPrice = product.price * quantity;
        const newOrder = this.orderRepository.create({
            user,
            product,
            quantity,
            totalPrice,
        });
        // product.stock -= quantity; 
        // await this.productRepository.save(product);// 更新库存
        // return this.orderRepository.save(newOrder); // 保存订单
        this.messagingService.publish('orders_exchange', 'orders_created', newOrder);
        return newOrder;
    }
    //此方法由消息队列调用
    async saveOrderToDatabase(order) {
        console.log('Saving order to database:', order);
        order.product.stock -= order.quantity; // 更新库存
        await this.productRepository.save(order.product); // 更新库存
        await this.orderRepository.save(order); // 保存订单
    }
    async getOrderById(id) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
};
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        rabbit_service_1.MessagingService])
], OrderService);
//# sourceMappingURL=order.service.js.map