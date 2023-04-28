import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//взяли прям с документации для локальной атворизации
@Injectable()
export class LocalAuthGuard extends AuthGuard('jwt') {}
