import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { FileType } from './entities/file-type.enum';

@Injectable()
export class FilesService {
  constructor(
    /**укамзав таким образом мы сможем внутри FilesService работать с базой данных
     * и теперь во всех методах мы можем обращаться к базе данных такми кодом
     * this.repository
     */
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  findAll(userId: number, fileType: FileType) {
    // return this.repository.find(); //так мы получи доступ ко всем сущностям в базе данных

    const qb = this.repository.createQueryBuilder('file'); //ищем файлы в базе
    qb.where('file.userId=:userId', { userId }); //тут показываем что ищем именно файл конкретного юзера

    if (fileType === FileType.PHOTOS) {
      //то будем возвращать файлы как image
      qb.andWhere('file.mimetype ILike :type', { type: '%image%' });
    }

    if (fileType === FileType.TRASH) {
      //тут будем возвращать только помеяченные как удаленные
      qb.withDeleted().andWhere('file.deletedAt IS NOT NUll');
    }

    return qb.getMany(); //тут возвращаем все записи
  }

  //этот метод для отправки файло онполучает пользователя и id
  create(file: Express.Multer.File, userId: number) {
    //тут мы сохраним в базе данных информацпю о файле с пользователем
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  //функция по удалению файлов
  async remove(userId: number, ids: string) {
    const idsArray = ids.split(','); //будет получать список файлов через запятую и превращать в массив

    const db = this.repository.createQueryBuilder('file'); //передает в запрос

    //тут он найдет все файлы и пометит их как удаленные
    db.where('id IN (:...ids) AND userId=:userId', {
      ids: idsArray,
      userId,
    });

    return db.softDelete().execute(); //при этом он не будет удалять их из самой таблицы
  }
}
