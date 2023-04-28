import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
@ApiTags('users') //этим декоратором мы сгрупировали наши запросы по users будет видно в библиотеке Swagger
@ApiBearerAuth() //декоратор показыват что для доступа необходим токен для  swagger после єтого в ыцфппук появляется замочки какбы защищено
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //создаем запрос который будет возвращать информацию л пользоватле
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getme(@UserId() id: number) {
    //находим информацию о пользователе по id
    return this.usersService.findById(id);
  }
}
