import { MongodbService } from '@app/prisma';
import {
  ConsoleLogger,
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
    private readonly customOption: LoggerModuleOptions,
    private readonly mongodbService: MongodbService,
  ) {
    super(customOption.appName); // 设置默认上下文为 appName
  }

  // 统一处理所有日志级别
  private logMessage(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    // 格式化消息
    const formattedMessage = this.format(message);
    let _trace;

    // 调用父类方法输出到控制台
    switch (level) {
      case 'log':
        super.log(formattedMessage, context);
        break;
      case 'error':
        _trace = trace || message.stack || '';
        super.error(message, context);

        break;
      case 'warn':
        super.warn(formattedMessage, context);
        break;
      case 'debug':
        super.debug(formattedMessage, context);
        break;
      case 'verbose':
        super.verbose(formattedMessage, context);
        break;
    }

    // 异步发送到远程（如果启用）
    if (this.customOption.saveDb) {
      this.sendToRemote(level, formattedMessage, context, _trace);
    }
  }

  // 格式化消息（支持对象、错误等）
  format(message: any): string {
    if (typeof message === 'string') return message;
    if (message instanceof Error) return message.message;
    try {
      return JSON.stringify(message, null, 2);
    } catch {
      return String(message);
    }
  }

  // 覆盖所有日志方法
  log(message: any, context?: string) {
    this.logMessage('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.logMessage('error', message, context, trace);
  }

  warn(message: any, context?: string) {
    this.logMessage('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.logMessage('debug', message, context);
  }

  verbose(message: any, context?: string) {
    this.logMessage('verbose', message, context);
  }

  // 发送日志到数据库
  private async sendToRemote(
    level: LogLevel,
    message: string,
    context?: string,
    trace?: string,
  ) {
    try {
      if (!this.isInitialized) {
        return;
      }
      // await this.mongodbService.appLog.deleteMany();
      await this.mongodbService.appLog.create({
        data: {
          level: level.toUpperCase(),
          message,
          context,
          trace,
          appName: this.customOption.appName,
        },
      });
    } catch (error) {
      console.error('Failed to save log:', error);
    }
  }
}
