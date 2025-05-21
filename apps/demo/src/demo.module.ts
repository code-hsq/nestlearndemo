import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { Demo2Module } from './demo2/demo2.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Demo2Config from 'configs/demo2.config';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [Demo2Config],
    // }),
    LoggerModule.forRoot({
      saveDb: true,
      appName: 'DEMO',
    }),
    Demo2Module,
  ],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
