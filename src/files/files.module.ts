import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService],

  //тут мы добавил для того что бы файл не только сохранялся на сервере нои в базе данных
  imports: [TypeOrmModule.forFeature([FileEntity])],
})
export class FilesModule {}
