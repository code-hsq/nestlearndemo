import { CustomException } from '@app/filter';

export enum UserErrorStatus {
  /**
   * 用户不存在
   */
  USER_NOT_FOUND = 40001,
  /**
   * 用户已被禁用
   */
  USER_DISABLED = 40002,
  /**
   * 用户已存在
   */
  USER_ALREADY = 40003,
  /**
   * 用户名或者密码错误
   */
  LOGIN_PWD_ERROR = 40004,
}

const UserErrorStatusTxt: { [key in UserErrorStatus]: string } = {
  [UserErrorStatus.USER_NOT_FOUND]: '用户不存在',
  [UserErrorStatus.USER_DISABLED]: '用户已被禁用',
  [UserErrorStatus.USER_ALREADY]: '用户已存在',
  [UserErrorStatus.LOGIN_PWD_ERROR]: '用户名或者密码错误',
};

export class UserException extends CustomException {
  constructor(code: UserErrorStatus) {
    super(code, UserErrorStatusTxt[code]);
  }
}
