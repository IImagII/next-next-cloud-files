//схема которая описывает какиеданные мы можем передавать с клиентской части на бекенд

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  /**@ApiProperty() - тоже устанавливаем декоратор чтобы было взаимодетсвие с auth.controller.ts
  тут мы опишем что мы ожидаем от фронтенда
  это нужно чтобы swagger понимал какие у нас есть свойства
  после этог оу нас появиться схема в swager*/

  @ApiProperty({
    //тут в обьектеуказывапем что унас будет по умолчанию
    default: 'test@test.ua',
  })
  email: string;

  @ApiProperty({
    default: 'Железный человек',
  })
  fullName: string;

  @ApiProperty({
    default: '123456',
  })
  password: string;
}
