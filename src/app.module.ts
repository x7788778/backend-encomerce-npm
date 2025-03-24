// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule , ConfigService } from '@nestjs/config';  //基于dotenv
import { webcrypto } from 'crypto';
if(!globalThis.crypto){
  globalThis.crypto = webcrypto;
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async(configService : ConfigService)=> ({
        type : configService.get<"sqlite">( 'TYPEORM_TYPE' ), 
        database : configService.get<string>( 'TYPEORM_DATABASE' ), 
        entities : [ __dirname + '/**/*.entity{.ts,.js}' ], 
        synchronize : configService . get<boolean> ( 'TYPEORM_SYNCHRONIZE' ),
        logging : configService.get<boolean>( 'TYPEORM_LOGGING') ,
      }),
      inject:[ConfigService]
    },
  ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
