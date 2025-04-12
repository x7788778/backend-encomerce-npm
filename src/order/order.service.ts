// src/order/order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { MessagingService } from '../rabbit/rabbit.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly messagingService: MessagingService,
  ) {}

  async createOrder(userId: number, productId: number, quantity: number): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new NotFoundException('Insufficient stock');
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
    this.messagingService.publish('orders_exchange', 'orders_created', newOrder as any);
    return newOrder;

  }
  //此方法由消息队列调用
  async saveOrderToDatabase(order: Order): Promise<void> {
    console.log('Saving order to database:', order);

    order.product.stock -= order.quantity; // 更新库存
    await this.productRepository.save(order.product);// 更新库存
    await this.orderRepository.save(order);// 保存订单
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}