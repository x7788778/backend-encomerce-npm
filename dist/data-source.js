"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
// 其他导入...
const configService = new config_1.ConfigService();
const AppDataSource = new typeorm_1.DataSource({
    type: configService.get('TYPEORM_TYPE'),
    host: configService.get('TYPEORM_HOST'),
    port: configService.get('TYPEORM_PORT'),
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
    logging: configService.get('TYPEORM_LOGGING'),
    migrations: [__dirname + '/migrations/*.ts'],
    migrationsRun: true
});
exports.AppDataSource = AppDataSource;
// 配置 cli 选项（用于命令行工具）
// 使用类型断言绕过类型检查
AppDataSource.options.cli = {
    migrationsDir: 'src/migrations'
};
//# sourceMappingURL=data-source.js.map