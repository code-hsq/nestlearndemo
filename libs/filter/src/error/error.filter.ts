import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionOptions,
  Logger,
} from '@nestjs/common';

export class CustomException extends HttpException {
  code: number;
  constructor(
    code: number,
    message: string,
    httpStatus: number = 200,
    options?: HttpExceptionOptions,
  ) {
    super(message, httpStatus, options);
    this.code = code;
  }
}

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const timestamp = new Date().getTime();
    if (exception instanceof CustomException) {
      return response.status(exception.getStatus()).json({
        code: exception.code,
        message: exception.message,
        timestamp,
      });
    } else if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        code: exception.getStatus(),
        message: exception.message,
        timestamp,
        path: request.url,
      });
    } else {
      Logger.error(exception);
      const error = exception as Error;
      const error_message = error?.message || error;
      return response.status(500).json({
        code: 500,
        message: '服务器内部异常',
        error: error_message,
        timestamp,
        path: request.url,
      });
    }
  }
}
