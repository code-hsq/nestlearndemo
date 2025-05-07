import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const time = new Date().getTime();
    Logger.log(`${time}:[${req.method}] -req- ${req.url} -body: ${JSON.stringify(req.body)}`);
    const originalSend = res.send;
    res.send = function (body) {
      Logger.log(`${time}:[${req.method}] -res- ${req.url} -data: ${JSON.stringify(body)}`);
      return originalSend.call(this, body);
    };
    next();
  }
}
