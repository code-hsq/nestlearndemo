import {
  IsNotEmpty,
  IsObject,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * 用户名
   * @example dmhsq
   */
  @MaxLength(12, {
    message: '用户名长度不能超过12位',
  })
  @IsNotEmpty()
  userName: string;

  @Matches(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,11}$/, {
    message: '密码必须以字母开头，且同时包含字母和数字',
  })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
