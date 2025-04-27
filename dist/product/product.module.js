"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = __importDefault(require("ioredis"));
const rabbit_module_1 = require("../rabbit/rabbit.module");
const consumers_module_1 = require("../consumers/consumers.module");
// import {ProductConsumersService} from '../consumers/consumers.service';
let ProductModule = exports.ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // forwardRef(() => ConsumersModule),
            consumers_module_1.ConsumersModule,
            rabbit_module_1.RabbitExampleModule,
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
            ioredis_1.RedisModule
        ],
        controllers: [product_controller_1.ProductController],
        providers: [
            product_service_1.ProductService,
            {
                provide: 'REDIS_CLIENT',
                useFactory: () => new ioredis_2.default('redis://localhost:6379')
            }
        ],
        exports: [product_service_1.ProductService, typeorm_1.TypeOrmModule, 'REDIS_CLIENT']
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map