import { NestFactory, Reflector } from '@nestjs/core';
import { DemoModule } from './demo.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseMiddleware } from './response/response.middleware';
import { CustomErrorFilter } from './custom-error/custom-error.filter';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(DemoModule);
  const port = process.env.port ?? 3000;
  // app.useGlobalFilters(new CustomErrorFilter());
  // app.useGlobalGuards(new AuthGuard())
  // app.useGlobalPipes(new ValidationPipe())
  Logger.log(`listening on port ${port}`);
  // app.use(ResponseMiddleware);
  await app.listen(port);
}
bootstrap();
