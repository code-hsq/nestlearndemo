import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/mongodb';

@Injectable()
export class MongodbService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
