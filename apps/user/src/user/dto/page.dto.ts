import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PageDto {
  @IsNumber()
  @Min(1, {
    message: '页码不能小于1',
  })
  @Transform(({ value }) => parseInt(value, 10))
  pageNumber?: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize?: number;
}
