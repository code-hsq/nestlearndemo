import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/mongodb';

@Injectable()
export class MongodbService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
    Logger.log('mongodb连接完成');
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
