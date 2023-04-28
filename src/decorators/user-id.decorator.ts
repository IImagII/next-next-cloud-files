//этот декоратор нужен для того чтобы загружать файлы и прикреплять к нему id пользователя

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//createParamDecorator- функция для создания декоратора
export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id ? Number(request.user.id) : null; // из запроса вытаскиваем id пользователя
  },
);
/**мы создадли свой декоратор для того чтобы вытаскивать id пользваотеля
 * из запроса и вставлять
 * его в тот файл которій он загружает
 *  после чего возвращается в user.controller.ts */
