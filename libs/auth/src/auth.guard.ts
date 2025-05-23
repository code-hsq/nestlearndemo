import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;
  @Inject(AuthService)
  private readonly authService: AuthService;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const unNeed = this.reflector.getAllAndOverride<Boolean>('un-need-auth', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (unNeed === true) {
      return true;
    }
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      const auth = req.headers['authorization'];
      const token = auth?.split(' ')[1];
      if (!token) {
        return false;
      }
      const user = await this.authService.verify(token);
      if (!user) {
        return false;
      }
      req.user = user;
      return true;
    }
    return false;
  }
}

export class VipGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(context: ExecutionContext): boolean {
    const vip = this.reflector.getAllAndOverride<number>('vip', [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const userVip = user.vip;
    if (userVip >= vip) {
      return true;
    }
    return false;
  }
}
