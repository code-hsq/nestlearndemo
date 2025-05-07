import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body = { reqData: req.body };
    const originalSend = res.send;
    res.send = function (body) {
      const newBody = {
        code: 200,
        message: 'Success',
        data: isJson(body) ? JSON.parse(body) : body,
      };
      return originalSend.call(this, JSON.stringify(newBody));
    };
    next();
  }
}
