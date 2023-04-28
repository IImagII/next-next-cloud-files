import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fileStorage } from './storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('files')
@ApiTags('files') //групируем запросы по тегу files
@UseGuards(JwtAuthGuard) //этот декоратор нужен дял того чтобы весь контролер был защищен авторизацией
@ApiBearerAuth() //декоратор показыват что для доступа необходим токен для  swagger после єтого в ыцфппук появляется замочки какбы защищено
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  //метод для получения всех файлов
  @Get()
  findAll() {
    return this.filesService.findAll(); //тут мы обратились к filesService и запрашиваем унего все что есть
  }

  //это метод для добавления файлов
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage, //тут указываем то что мы создали в файле storage с данными где мы будем хранить наши файлы
    }),
  ) //декоратор для работы с файлами
  @ApiConsumes('multipart/form-data') //декоратор для тго чтобы можно было загружать файлы для библиотеки Swagger

  //этот декоратор настроит нашу схему для swapper
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  //@UploadedFile  - декарато для того чтобы вытаскивать файл из запроса
  create(
    @UploadedFile(
      //тут делаем валидацию используя специаьные функции(например установим особый размер 5Mb)
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
