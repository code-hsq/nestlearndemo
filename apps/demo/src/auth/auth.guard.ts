import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BusinessErrorStatus, CustomException } from '../custom-error/custom-error.filter';
import { Reflector } from '@nestjs/core';
import { useUnNeedAuth } from '../un-need-auth/un-need-auth.decorator';

export const useAuthGuard = () => UseGuards(AuthGuard)

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    Logger.log(request.headers)
    const unNeed = this.reflector.get<Boolean>(useUnNeedAuth, context.getHandler());

    if (unNeed === true) {
      return true
    }
    const authorization = request.headers?.authorization;
    if (!authorization) {
      return false
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return false
    }
    const verify = (token) => {
      if (token == 'dmhsq1234') {
        return true
      }
      return false
    }
    const check = verify(token);
    if (!check) {
      throw new CustomException(BusinessErrorStatus.NO_AUTH)
    }
    return true;
  }
}
