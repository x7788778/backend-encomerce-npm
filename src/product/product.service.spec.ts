import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [{ id: 1, name: 'Product A' }];
      mockProductRepository.find.mockResolvedValue(products);

      const result = await service.findAll();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product = { id: 1, name: 'Product A' };
      mockProductRepository.findOne.mockResolvedValue(product);

      const result = await service.findOne(1);
      expect(result).toEqual(product);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productData = { name: 'Product A',description:'asdsda',price:19.99,stock:100 };
      const product = { id: 1, ...productData };
      mockProductRepository.create.mockReturnValue(product);
      mockProductRepository.save.mockResolvedValue(product);

      const result = await service.create(productData);
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const productData = { price: 29.99 };
      const product = { id: 1, ...productData };
      mockProductRepository.update.mockResolvedValue({ affected: 1 });
      mockProductRepository.findOne.mockResolvedValue(product);

      const result = await service.update(1, productData);
      expect(result).toEqual(product);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      mockProductRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.delete(1);
      expect(result).toEqual({ message: 'Product deleted successfully' });
    });
  });
});