import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(productData: Omit<Product, 'id'>) {
    const newProduct = this.productRepository.create(productData);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, productData: Partial<Product>) {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    await this.productRepository.delete(id);
    return { message: 'Product deleted successfully' };
  }
}