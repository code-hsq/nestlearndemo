import { PrismaService } from '@app/prisma';
import { RedisService } from '@app/redis';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async login(data: { userId: string }) {
    const payload = data;

    const expiresIn = this.configService.get('jwt.expires_in');
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn,
    });
    const key = `jwt_user:${payload.userId}${access_token}`;

    //单点
    // const key = `jwt_user:${payload.userId}`;
    await this.redisService.set(key, access_token, {
      ttl: expiresIn,
    });
    return {
      access_token,
      expiresIn,
    };
  }

  async loginMany(data: { userId: string }) {}

  async verify(token: string) {
    try {
      // 验证并解码 token
      const data = this.jwtService.verify(token, {
        secret: this.configService.get('jwt.secret'),
      });
      if (!data) {
        throw new UnauthorizedException('登录失效');
      }
      const key = `jwt_user:${data.userId}${token}`;

      // 单点
      //   const key = `jwt_user:${data.userId}`;
      const redisToken = await this.redisService.get(key);
      if (!redisToken) {
        throw new UnauthorizedException('登录失效');
      }
      if (redisToken && redisToken !== token) {
        throw new UnauthorizedException('登录失效');
      }
      if (redisToken === token) {
        const { userId } = data;
        if (!userId) {
          throw new UnauthorizedException('登录失效');
        }
        const userData = await this.prisma.user.findUnique({
          where: {
            userId,
          },
        });
        if (!userData) {
          throw new UnauthorizedException('登录失效');
        }
        return userData;
      }
    } catch (error) {
      // 处理无效 token
      throw new UnauthorizedException('登录失效');
    }
  }
}
