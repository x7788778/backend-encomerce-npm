import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Redis } from 'ioredis';
import { Inject } from '@nestjs/common';
import { MessagingService } from '../rabbit/rabbit.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly messagingService: MessagingService,
  ) {}
  async findAll() {
    const cachedProducts = await this.redis.get('allProducts');

    if (cachedProducts) {
      this.messagingService.publish('products_exchange', 'products_findall', cachedProducts);
      return JSON.parse(cachedProducts);
    }

    const products = await this.productRepository.find();
    await this.redis.set('allProducts', JSON.stringify(products), 'EX', 6000);
    this.messagingService.publish('products_exchange', 'products_findall', cachedProducts);
    return products;
  }

  async findOne(id: number) {
    const cachedProduct = await this.redis.get(`product:${id}`);
    if (cachedProduct) {
      return JSON.parse(cachedProduct);
    }
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.redis.set(`product:${id}`, JSON.stringify(product), 'EX', 6000);
    return product;
  }

  async create(productData: Omit<Product, 'id'>) {
    const newProduct = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(newProduct);
    await this.redis.del('allProducts');
    this.messagingService.publish('products_exchange', 'products_created', savedProduct as any);
    return savedProduct;
  }

  async update(id: number, productData: Partial<Product>) {
    const result = await this.productRepository.update(id, productData);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.redis.del(`product:${id}`);
    await this.redis.del('allProducts');
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.redis.del(`product:${id}`);
    await this.redis.del('allProducts');
    return { message: 'Product deleted successfully' };
  }
}
