import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

//настраиваем JWT конфигурацию для скрытия пароля
export const getJwtConfig = async (
  //configService -библиотека которая  позволяет обращатьсяк файлу .env
  configService: ConfigService,
) => {
  return {
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: configService.get('EXPIRES_IN') },
  };
};
