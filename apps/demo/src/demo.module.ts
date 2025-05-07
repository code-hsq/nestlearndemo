import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { Demo2Module } from './demo2/demo2.module';

@Module({
  imports: [Demo2Module],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
