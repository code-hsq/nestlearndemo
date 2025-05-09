import {
  createParamDecorator,
  ExecutionContext,
  applyDecorators,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CustomErrorFilter } from '../custom-error/custom-error.filter';
import { ResInterceptor } from '../res/res.interceptor';
import { ReqInterceptor } from '../req/req.interceptor';

export const User = createParamDecorator(
  (data: undefined | string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);

export function UseReqResErr() {
  return applyDecorators(
    UseFilters(CustomErrorFilter),
    UseInterceptors(ResInterceptor),
    UseInterceptors(ReqInterceptor),
  );
}
