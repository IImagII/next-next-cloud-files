//стратегия для общения с JWT
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService, //тут мы получаем configservice
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, //тут мы берем наш секретный ключ
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(+payload.id); //это нужно чтобы когда будет генерироваться токен в него будет вшит id пользователя

    if (!user) {
      throw new UnauthorizedException('У вас нет доступа');
    }
    return {
      id: user.id,
    };
  }
}
//не забываем подключить ее в модель auth.module.ts
