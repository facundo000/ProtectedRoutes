import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.enableCors({
    origin:'*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true ,
      forbidNonWhitelisted: true
    })
  )
  
  app.setGlobalPrefix('protected-routes/v1');
  await app.listen(3000);
  logger.log(`App running on PORT:${process.env.PORT}`)
}
bootstrap();
