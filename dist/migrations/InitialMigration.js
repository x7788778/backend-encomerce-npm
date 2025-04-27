"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1693034000000 = void 0;
// const { MigrationInterface, QueryRunner } = require('typeorm');
class InitialMigration1693034000000 {
    async up(queryRunner) {
        // 创建 User 表
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR UNIQUE NOT NULL,
                "password" VARCHAR NOT NULL
            );
        `);
        // 创建 Product 表
        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR NOT NULL,
                "description" TEXT NOT NULL,
                "price" NUMERIC(10, 2) NOT NULL,
                "stock" INTEGER NOT NULL
            );
        `);
        // 创建 Order 表
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL PRIMARY KEY,
                "quantity" INTEGER NOT NULL,
                "totalPrice" NUMERIC(10, 2) NOT NULL,
                "status" VARCHAR CHECK (status IN ('pending', 'paid', 'shipped', 'completed', 'cancelled')) DEFAULT 'pending',
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "userId" INTEGER,
                "productId" INTEGER,
                FOREIGN KEY ("userId") REFERENCES "user"("id"),
                FOREIGN KEY ("productId") REFERENCES "product"("id")
            );
        `);
    }
    async down(queryRunner) {
        // 删除 Order 表
        await queryRunner.query(`DROP TABLE "order";`);
        // 删除 Product 表
        await queryRunner.query(`DROP TABLE "product";`);
        // 删除 User 表
        await queryRunner.query(`DROP TABLE "user";`);
    }
}
exports.InitialMigration1693034000000 = InitialMigration1693034000000;
//# sourceMappingURL=InitialMigration.js.map