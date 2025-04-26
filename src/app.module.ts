// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';  //基于dotenv
import { webcrypto } from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis' ;
import { RabbitExampleModule } from './rabbit/rabbit.module';
import { ConsumersModule } from './consumers/consumers.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'postgres'>('TYPEORM_TYPE'),
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
        logging: configService.get<boolean>('TYPEORM_LOGGING'),
        migrations: [__dirname + '/migrations/*.ts'], // 迁移脚本路径
        cli: {
          migrationsDir: 'src/migrations' // CLI 生成迁移脚本的目录
        },
        migrationsRun: true // 自动运行未执行的迁移脚本
        
      }),
      inject: [ConfigService]
    },
    ),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '36000s' }, // 硬编码10小时
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync ( {
       useFactory: (): RedisModuleOptions => ({ 
          type: 'single',
          url: 'redis://localhost:6379',
      }),
    }),
    PassportModule,
    UserModule,
    AuthModule,
    ProductModule,
    RabbitExampleModule,
    ConsumersModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
