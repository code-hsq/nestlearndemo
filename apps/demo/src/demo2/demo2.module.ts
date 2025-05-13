import { Module } from '@nestjs/common';
import { Demo2Service } from './demo2.service';
import { Demo2Controller } from './demo2.controller';
import { ConfigModule } from '@nestjs/config';
import Demo2Config from 'configs/demo2.config';
import Demo3Config from 'configs/demo3.config';
import DemoConfig from 'configs/demo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => DemoConfig, Demo3Config, Demo2Config],
    }),
  ],
  controllers: [Demo2Controller],
  providers: [Demo2Service],
})
export class Demo2Module {}
