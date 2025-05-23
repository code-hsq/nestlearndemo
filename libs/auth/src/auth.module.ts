import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import AuthConfig from 'configs/auth.config';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';

@Global()
@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AuthConfig],
    }),
    RedisModule,
    PrismaModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
