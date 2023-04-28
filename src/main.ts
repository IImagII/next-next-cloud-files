import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express'; // это нужно указания статиченой папки
import { join } from 'path'; // это нужно указания статиченой папки

//самый главный файл который запустит весь сервис
async function bootstrap() {
  //необходимо отключить { cors: false } чтобы заходить с любого места
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({ credentials: true, origin: true }); //тут мы отключим полностью нша cors

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads'))); //тут указываем нашу статическую папку в которой будут храниться папки

  //тут мы вставили код для подключения библиотеки для документирования Swagger
  const config = new DocumentBuilder()
    .setTitle('Облачное хранилище') //указываем свои настройки
    .setVersion('1.0')
    .addBearerAuth() //это нужн для того чтобы swagger понимал токен и мог сни работать
    .build();
  const document = SwaggerModule.createDocument(app, config);

  //єто с натсройками чтобі  swagger понимал и мог работать с токеном
  SwaggerModule.setup('swagger', app, document, {
    //после этих настроек должно появиться авторизация в swagger
    swaggerOptions: {
      persistAuthorization: true,
    },
  }); // тут поменяеоли стандартный путь 'swagger'

  await app.listen(7777);
}
bootstrap();
