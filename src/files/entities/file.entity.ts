import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files') //он необходим для того чтобы делать соединения с базой данных
export class FileEntity {
  @PrimaryGeneratedColumn() //для автоматической генерации id
  id: number;

  @Column() //для создания простых колонок
  filename: string;

  @Column()
  originalName: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @DeleteDateColumn() //его задача указывать был ли файл удален илим нет тоесть мы его помечаем
  deletedAt?: Date;

  /** она показываем файлы которые принадлежат одному пользователю
   * это и есть обратная связь с другой таблицей и у файла может біть пользователь*/
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
}
