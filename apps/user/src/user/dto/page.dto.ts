import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PageDto {
  /**
   * 页码
   * @example 1
   */
  @IsNumber()
  @Min(1, {
    message: '页码不能小于1',
  })
  @Transform(({ value }) => parseInt(value, 10))
  pageNumber?: number;

  /**
   * 每页数量
   * @example 10
   */
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize?: number;
}
