import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getPrismaErrorMessage } from './error/error.filter';

@Injectable()
export class PrismaService extends PrismaClient {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      Logger.error(getPrismaErrorMessage(error.errorCode, error.message));
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
