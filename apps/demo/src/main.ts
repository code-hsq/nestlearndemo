import { NestFactory } from '@nestjs/core';
import { DemoModule } from './demo.module';
import { Logger } from '@nestjs/common';
import { ResponseMiddleware } from './response/response.middleware';
import { CustomErrorFilter } from './custom-error/custom-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(DemoModule);
  const port = process.env.port ?? 3000;
  app.useGlobalFilters(new CustomErrorFilter())
  Logger.log(`listening on port ${port}`);
  // app.use(ResponseMiddleware);
  await app.listen(port);
}
bootstrap();
