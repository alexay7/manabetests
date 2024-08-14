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

  app.enableCors();

  await app.listen(5001);
}
bootstrap();

const globalErrorHandler = function(err:Error) {
  console.error("Uncaught Exception", err);
};

process.on("unhandledRejection", globalErrorHandler);
process.on("uncaughtException", globalErrorHandler);