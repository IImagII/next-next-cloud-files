import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, //это мы подключили для токена
  ) {} // подключаем для работы с UsersService

  //создадим метод для проверки email и пароля
  async validateUser(email: string, password: string): Promise<any> {
    //сначало находимпользователя по email
    const user = await this.usersService.findByEmail(email);

    //тут провверяем пароль сходиться с тем  email  который у нас есть
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null; //если атворизация прошла не успешно
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto); //получаем dto и создаем пользователя

      return {
        token: this.jwtService.sign({ id: userData.id }), //генерируем токен при регистрации
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Ошибка при регитсрации');
    }
  }

  //создаем метод авторизации
  async login(user: UserEntity) {
    //мы получим информацию о пользователи и ее мы
    //зашифруем в токен
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
