import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { FileEntity } from './files/entities/file.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //модель для работы непосресдтвенно с файлами env

    //добали для подключения к базе данных
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, FileEntity], //тут указываем все наши побазы которые мы создаем у нас это user, files. При этом Typeorm создаст сам соединение
      synchronize: true,
    }),
    UsersModule,
    FilesModule,
    AuthModule, //тут само автоматически подключается если устанавливаем через команду nest g module auth
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
