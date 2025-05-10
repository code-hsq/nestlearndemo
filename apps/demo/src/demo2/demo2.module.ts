import { Module, ValidationPipe } from '@nestjs/common';
import { Demo2Service } from './demo2.service';
import { Demo2Controller } from './demo2.controller';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [Demo2Controller],
  providers: [
    Demo2Service,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // }
  ],
})
export class Demo2Module {}
