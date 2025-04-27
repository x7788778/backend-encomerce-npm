import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
// 其他导入...

const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: configService.get<'postgres'>('TYPEORM_TYPE'),
    host: configService.get<string>('TYPEORM_HOST'),
    port: configService.get<number>('TYPEORM_PORT'),
    username: configService.get<string>('TYPEORM_USERNAME'),
    password: configService.get<string>('TYPEORM_PASSWORD'),
    database: configService.get<string>('TYPEORM_DATABASE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
    logging: configService.get<boolean>('TYPEORM_LOGGING'),
    migrations: [__dirname + '/migrations/*.ts'],
    
    migrationsRun: true
});
// 配置 cli 选项（用于命令行工具）
// 使用类型断言绕过类型检查
(AppDataSource.options as any).cli = {
    migrationsDir: 'src/migrations'
};

// 添加导出语句
export { AppDataSource };


