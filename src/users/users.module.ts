import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  //тут мы добавил для того работы с базой данных
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService], // это нужно для того чтобы использовать UsersService в других сервисах в нашем слусчаем для того чтобы пользоваться им при авторизации в  файле auth.service.ts
})
export class UsersModule {}
