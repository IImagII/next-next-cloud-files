import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.repository.find(); //так мы получи доступ ко всем сущностям в базе данных
  }
}
