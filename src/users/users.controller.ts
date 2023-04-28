import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users') //этим декоратором мы сгрупировали наши запросы по users будет видно в библиотеке Swagger
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
