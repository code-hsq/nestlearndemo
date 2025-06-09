import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, VipGuard } from './auth.guard';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

export const UnNeedAuth = () => SetMetadata('un-need-auth', true);

export const useVipGuard = () => UseGuards(VipGuard);
//
export const NeedVip = (vip: number) =>
  applyDecorators(SetMetadata('vip', vip), useAuthGuard(), useVipGuard());

export const useAuthGuard = () =>
  applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());

export const User = createParamDecorator(
  (data: undefined | keyof Prisma.UserFieldRefs, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      console.log(data, request.user);
      return request.user[data];
    }
    return request.user;
  },
);
