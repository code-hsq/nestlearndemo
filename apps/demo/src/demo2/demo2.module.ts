import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Demo2Service } from './demo2.service';
import { Demo2Controller } from './demo2.controller';
import { ResponseMiddleware } from '../response/response.middleware';
import { LoggerMiddleware } from '../logger/logger.middleware';

@Module({
  controllers: [Demo2Controller],
  providers: [Demo2Service],
})
export class Demo2Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( LoggerMiddleware,ResponseMiddleware)
      .forRoutes(Demo2Controller);
  }
}
