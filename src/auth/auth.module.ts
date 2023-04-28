import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy], //тут подключили локальную стратегию
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      //это мы получаем стандартно
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig, //тут моя функция которую я задал в папку config->jwt.config.ts
    }),
    UsersModule,
    PassportModule,
  ], // подключаем для атворизации
})
export class AuthModule {}
