import { Injectable } from '@nestjs/common';

//храниться бизнес логика
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
