// import "reflect-metadata"
// import { DataSource } from "typeorm"
// import { User } from "./entity/User"

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "test",
//     password: "test",
//     database: "test",
//     synchronize: true,
//     logging: false,
//     entities: [User],
//     migrations: [],
//     subscribers: [],
// })

// import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import { Product } from './product/product.entity';
// import { Order } from './order/order.entity';
const { DataSource } = require("typeorm");
import { config } from 'dotenv';
config()
 const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.TYPEORM_USERNAME ,
    password: process.env.TYPEORM_PASSWORD ,
    database: process.env.TYPEORM_DATABASE ,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // 开发环境可以设置为 true，生产环境建议关闭
    logging: process.env.TYPEORM_LOGGING,
    migrations: [__dirname + '/migrations/*.ts'],
});

// 配置 cli 选项（用于命令行工具）
// 使用类型断言绕过类型检查
(AppDataSource.options as any).cli = {
    migrationsDir: 'src/migrations'
};

module.exports = {
    AppDataSource
}