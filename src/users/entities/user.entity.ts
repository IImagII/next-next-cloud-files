//взаимодействие с базой данных
//тут описывается структура наших пользователей и уже тут мы моежм ее менять

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FileEntity } from '../../files/entities/file.entity';

@Entity('users') //он необходим для того чтобы делать соединения с базой данных
//не забываем менять название нашего класса
export class UserEntity {
  @PrimaryGeneratedColumn() //для автоматической генерации id
  id: number;

  @Column() //для создания простых колонок
  email: string;

  @Column() //для создания простых колонок
  password: string;

  @Column() //для создания простых колонок
  fullName: string;

  @OneToMany(() => FileEntity, (file) => file.user) //декоратор для создания связи с другой базой данных у нашем случае с files
  files: FileEntity[]; // тут мы показываем что нам будет возвращаться с другой таблицы в нашем случаче это список файлов которые принадлежат одному пользоватлю
}
