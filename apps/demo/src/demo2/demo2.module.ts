import { Module, } from '@nestjs/common';
import { Demo2Service } from './demo2.service';
import { Demo2Controller } from './demo2.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [Demo2Controller],
  providers: [Demo2Service,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard
    // }
  ],
})
export class Demo2Module { }
