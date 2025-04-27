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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const ioredis_1 = require("ioredis");
const common_2 = require("@nestjs/common");
const rabbit_service_1 = require("../rabbit/rabbit.service");
let ProductService = exports.ProductService = class ProductService {
    constructor(productRepository, redis, messagingService) {
        this.productRepository = productRepository;
        this.redis = redis;
        this.messagingService = messagingService;
    }
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
    async findOne(id) {
        const cachedProduct = await this.redis.get(`product:${id}`);
        if (cachedProduct) {
            return JSON.parse(cachedProduct);
        }
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.redis.set(`product:${id}`, JSON.stringify(product), 'EX', 6000);
        return product;
    }
    async create(productData) {
        const newProduct = this.productRepository.create(productData);
        const savedProduct = await this.productRepository.save(newProduct);
        await this.redis.del('allProducts');
        this.messagingService.publish('products_exchange', 'products_created', savedProduct);
        return savedProduct;
    }
    async update(id, productData) {
        const result = await this.productRepository.update(id, productData);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.redis.del(`product:${id}`);
        await this.redis.del('allProducts');
        return this.productRepository.findOne({ where: { id } });
    }
    async delete(id) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.redis.del(`product:${id}`);
        await this.redis.del('allProducts');
        return { message: 'Product deleted successfully' };
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, common_2.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ioredis_1.Redis,
        rabbit_service_1.MessagingService])
], ProductService);
//# sourceMappingURL=product.service.js.map