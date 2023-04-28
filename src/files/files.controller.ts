import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fileStorage } from './storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { FileType } from './entities/file-type.enum';

@Controller('files')
@ApiTags('files') //групируем запросы по тегу files
@UseGuards(JwtAuthGuard) //этот декоратор нужен дял того чтобы весь контролер был защищен авторизацией
@ApiBearerAuth() //декоратор показыват что для доступа необходим токен для  swagger после єтого в ыцфппук появляется замочки какбы защищено
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  //метод для получения всех файлов
  @Get()
  findAll(
    /**   иы показываем что этот запарос будет возвращать файлы 
    только определенного пользователя благодаря нашему декоратору и определенного типа*/
    @UserId() userId: number,
    //@Query- декоратор для того чтобы вытаскивать тип из параметра
    @Query('type') fileType: FileType,
  ) {
    return this.filesService.findAll(userId, fileType); //тут мы обратились к filesService и запрашиваем унего все что есть
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
    @UserId() userId: number, //тут нашим декоратором мы получаем id пользователя и передаем его ниже для сохранения файла с єтим id
  ) {
    //тут мы использукем сам метод для создания который мы создали в service create
    //мы отправляем файл в базу данных с нужными нам данными
    return this.filesService.create(file, userId);
  }

  //делаем запрос на удаление файлов из баззы данных
  @Delete()
  remove(@UserId() userId: number, @Query('id') ids: string) {
    return this.filesService.remove(userId, ids);
  }
}
