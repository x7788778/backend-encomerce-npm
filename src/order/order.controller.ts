// src/order/order.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body('userId') userId: number, @Body('productId') productId: number, @Body('quantity') quantity: number) {
    return this.orderService.createOrder(userId, productId, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }
}