import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as ConfigMd } from '@nestjs/config';

@Module({
  imports: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
