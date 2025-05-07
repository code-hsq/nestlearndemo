import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Demo2Service } from './demo2.service';
import { Demo2Controller } from './demo2.controller';
import { ResponseMiddleware } from '../response/response.middleware';
import { LoggerMiddleware } from '../logger/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { CustomErrorFilter } from '../custom-error/custom-error.filter';

@Module({
  controllers: [Demo2Controller],
  providers: [Demo2Service,
  //   {
  //   provide:APP_FILTER,
  //   useClass:CustomErrorFilter
  // }
],
})
export class Demo2Module {}
// export class Demo2Module implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply( LoggerMiddleware,ResponseMiddleware)
//       .forRoutes(Demo2Controller);
//   }
// }
