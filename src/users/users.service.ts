import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    /**укамзав таким образом мы сможем внутри UserService работать с базой данных
     * и теперь во всех методах мы можем обращаться к базе данных такми кодом
     * this.repository
     */
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  //метод будет находитьпользователя по email
  async findByEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  //пишем метод который будети находить пользователя по id
  async findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  //метод по созданию пользователя
  create(dto: CreateUserDto) {
    //тут мы взяли dto мы описали то что мы ожидаем от фронденда в файле create-user.dto.ts
    return this.repository.save(dto);
  }
}
