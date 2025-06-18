import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // express part
  app.useStaticAssets(join(__dirname,'...',"uploads"), {
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('API for user registration and login with access and refresh tokens')
    .setVersion('1.0')
    .addTag('auithentication')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
