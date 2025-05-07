import { HttpStatus } from '@nestjs/common';

export default class ResObj {
  code: number;
  data: any;
  msg: string;
  constructor(code: number, data: any, msg: string) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }
}
