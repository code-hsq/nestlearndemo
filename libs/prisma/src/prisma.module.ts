import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error/error.filter';
import { MongodbService } from './mongodb.service';
@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    MongodbService,
  ],
  exports: [PrismaService, MongodbService],
})
export class PrismaModule {}
