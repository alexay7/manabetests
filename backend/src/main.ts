import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // publish the files at the media folder
  app.useStaticAssets('media', {
    prefix: '/media',
  });

  // Allow all cors from jlpt.manabe.es and renshuu.manabe.es
  app.enableCors({
    origin: [
      'https://jlpt.manabe.es',
      'https://renshuu.manabe.es',
      'http://localhost:5173',
    ],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

const globalErrorHandler = function(err:Error) {
  console.error("Uncaught Exception", err);
};

process.on("unhandledRejection", globalErrorHandler);
process.on("uncaughtException", globalErrorHandler);