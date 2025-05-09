import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';
import { CustomException } from '../custom-error/custom-error.filter';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception: CustomException) => {
        return of({
          code: exception.code,
          message: exception.message || '请求异常',
          isCatch: true,
        });
      }),
    );
  }
}
