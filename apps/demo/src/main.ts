import { NestFactory, Reflector } from '@nestjs/core';
import { DemoModule } from './demo.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseMiddleware } from './response/response.middleware';
import { CustomErrorFilter } from './custom-error/custom-error.filter';
import { AuthGuard } from './auth/auth.guard';
import { LoggerService } from '@app/logger';

async function bootstrap() {
  const app = await NestFactory.create(DemoModule);
  const port = process.env.port ?? 3000;
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  // app.useGlobalFilters(new CustomErrorFilter());
  // app.useGlobalGuards(new AuthGuard())
  // app.useGlobalPipes(new ValidationPipe())
  Logger.log(`listening on port ${port}`);
  // app.use(ResponseMiddleware);
  await app.listen(port);
}
bootstrap();
