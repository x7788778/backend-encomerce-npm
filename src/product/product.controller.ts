import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from './product.entity';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 获取所有商品（公开接口）
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // 获取单个商品（公开接口）
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // 创建商品（受保护接口）
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() productData: Omit<Product, 'id'>) {
    return this.productService.create(productData);
  }

  // 更新商品（受保护接口）
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() productData: Partial<Product>) {
    return this.productService.update(+id, productData);
  }

  // 删除商品（受保护接口）
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}