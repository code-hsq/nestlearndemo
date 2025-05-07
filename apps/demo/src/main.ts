import { NestFactory } from '@nestjs/core';
import { DemoModule } from './demo.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DemoModule);
  const port = process.env.port ?? 3000;
  Logger.log(`listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
