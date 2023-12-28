import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  const options = new DocumentBuilder()
    .setTitle('patient management API')
    .setDescription(
      'The Patient Management API is a solution for healthcare providers to manage patient information.',
    )
    .setVersion('1.0')
    .addTag('patients')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
