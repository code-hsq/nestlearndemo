import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from '@app/prisma';
import { RedisModule } from '@app/redis';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorFilter } from '@app/filter';
import { ResInterceptor } from '@app/interceptor';
import { LoggerModule } from '@app/logger';
import { AuthModule } from '@app/auth';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    RedisModule,
    LoggerModule.forRoot({
      appName: '用户系统',
      saveDb: false,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
  ],
})
export class AppModule {}
