import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

//ту тсоздаются запросы
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // подключаем наш AuthService чтобы можно было с ним работать

  @UseGuards(LocalAuthGuard) //вставляем из документации по JWT это нужно для локальной защиты если без авторизации
  @Post('login')
  @ApiBody({ type: CreateUserDto }) //этим дкоратором настраиваем swagger
  async login(@Request() req) {
    return this.authService.login(req.user as UserEntity); //тут генерируем токен
  }

  @HttpCode(200)
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
