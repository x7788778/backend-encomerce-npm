import { Test, TestingModule } from '@nestjs/testing';
import { ProductConsumersService } from './consumers.service';

describe('ConsumersService', () => {
  let service: ProductConsumersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductConsumersService],
    }).compile();

    service = module.get<ProductConsumersService>(ProductConsumersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
