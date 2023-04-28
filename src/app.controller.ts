import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//тут обрабатываються все запросы GET POST PUT
//тз этих запросов мы обрабатываем данные и передаем их внутрь сервиса
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
