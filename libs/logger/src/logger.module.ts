import { DynamicModule, Global, Module, NestModule } from '@nestjs/common';
import { LoggerModuleOptions, LoggerService } from './logger.service';
import { MongodbService, PrismaModule } from '@app/prisma';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: [PrismaModule],
      providers: [
        {
          provide: LoggerService,
          useFactory: (mongodbService: MongodbService) => {
            return new LoggerService(options, mongodbService);
          },
          inject: [MongodbService],
        },
      ],
      exports: [LoggerService],
    };
  }
}
