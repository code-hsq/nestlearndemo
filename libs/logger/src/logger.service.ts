import { MongodbService } from '@app/prisma';
import {
  ConsoleLogger,
  Inject,
  Injectable,
  LoggerService as LGS,
  LogLevel,
  OnModuleInit,
} from '@nestjs/common';

export interface LoggerModuleOptions {
  appName: string;
  saveDb?: boolean;
}

@Injectable()
export class LoggerService extends ConsoleLogger implements LGS, OnModuleInit {
  private isInitialized = false;
  onModuleInit() {
    this.isInitialized = true;
  }

  constructor(
    private readonly customOptions: LoggerModuleOptions,
    private readonly mongodbService: MongodbService,
    context?: string,
    isTimestampEnabled = true,
  ) {
    super(context, { timestamp: isTimestampEnabled });
  }

  // 覆盖 log 方法
  log(message: string, context?: string) {
    super.log(message, context);
    this.sendToRemote('log', message, context);
  }

  // 覆盖 error 方法
  error(message: string, trace?: string, context?: string) {
    trace
      ? super.error(message, trace, context)
      : super.error(message, context);

    this.sendToRemote('error', message, context, trace);
  }

  // 覆盖 warn 方法
  warn(message: string, context?: string) {
    super.warn(message, context);
    this.sendToRemote('warn', message, context);
  }

  // 覆盖 debug 方法
  debug(message: string, context?: string) {
    super.debug(message, context);
    this.sendToRemote('debug', message, context);
  }

  // 覆盖 verbose 方法
  verbose(message: string, context?: string) {
    super.verbose(message, context);
    this.sendToRemote('verbose', message, context);
  }

  // 自定义方法：发送日志到远程服务器
  private async sendToRemote(
    level: LogLevel,
    message: string,
    context?: string,
    trace?: string,
  ) {
    const data = {
      level: level.toUpperCase(),
      message,
      context,
      trace,
      appName: this.customOptions.appName,
    };
    if (this.customOptions.saveDb && this.isInitialized) {
      // await this.mongodbService.appLog.deleteMany();
      await this.mongodbService.appLog.create({
        data,
      });
    }
  }
}
