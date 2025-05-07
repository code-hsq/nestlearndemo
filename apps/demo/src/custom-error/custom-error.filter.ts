import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpExceptionOptions } from '@nestjs/common';


export enum BusinessErrorStatus {
  BE_DRUNK = 50001
}

const BusinessErrorStatusTxt: { [key: number]: string } = {
  [BusinessErrorStatus.BE_DRUNK]: "喝醉了，进行不了业务了"
}



export class CustomException extends HttpException {
  code: BusinessErrorStatus;
  constructor(code: BusinessErrorStatus, options?: HttpExceptionOptions) {
    const message = BusinessErrorStatusTxt[code]
    super(message, 200, options)
    this.code = code
  }
}


@Catch(HttpException)
// @Catch(CustomException)
export class CustomErrorFilter<T> implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus()
    const code = exception.code;
    response.status(status).json({
      code: code,
      message: exception.message || '请求异常',
      isCatch: true
    })
  }
}
