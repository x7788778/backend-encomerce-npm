import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
console.log(process.env.PORT,'prot');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
