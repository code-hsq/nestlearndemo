import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;

        // 仅对成功响应（2xx）进行格式化
        if (statusCode >= HttpStatus.OK && statusCode < 300) {
          return {
            code: 200,
            message: 'Success',
            data,
          };
        }
        return data;
      }),
    );
  }
}
