import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  no: number;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  nickname: string = '一只新用户';

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Date })
  createTime: Date;

  @ApiProperty({ type: Date })
  updateTime: Date;

  @ApiPropertyOptional({ type: String })
  wxId?: string;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiProperty({ type: Number })
  vip: number;
}
