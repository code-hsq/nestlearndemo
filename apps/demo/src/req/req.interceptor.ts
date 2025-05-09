import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { useUnNeedAuth } from '../un-need-auth/un-need-auth.decorator';
@Injectable()
export class ReqInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const success = () => {
      return next.handle();
    };

    const error = (message: string = 'Forbidden resource') => {
      return next.handle().pipe(() => {
        throw new ForbiddenException('', message);
      });
    };

    const request = context.switchToHttp().getRequest();
    const unNeed = this.reflector.get<Boolean>(
      useUnNeedAuth,
      context.getHandler(),
    );

    if (unNeed === true) {
      return success();
    }
    const authorization = request.headers?.authorization;
    if (!authorization) {
      return error('用户未登录');
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return error('非法token');
    }
    const verify = (token) => {
      if (token == 'dmhsq1234') {
        return {
          userId: '1234',
          userName: 'dmhsq',
        };
      }
      return false;
    };
    const user = verify(token);
    if (!user) {
      return error('登录失效');
    }
    request.user = user;
    return success();
  }
}
