import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpException,
  HttpStatus,
  BadGatewayException,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  ParseArrayPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Demo2Service } from './demo2.service';
import { CreateDemo2Dto } from './dto/create-demo2.dto';
import { UpdateDemo2Dto } from './dto/update-demo2.dto';
import {
  BusinessErrorStatus,
  CustomErrorFilter,
  CustomException,
} from '../custom-error/custom-error.filter';
import { AuthGuard, useAuthGuard } from '../auth/auth.guard';
import {
  UnNeedAuth,
  useUnNeedAuth,
} from '../un-need-auth/un-need-auth.decorator';
import { ResInterceptor } from '../res/res.interceptor';
import { ErrorInterceptor } from '../error/error.interceptor';
import { ReqInterceptor } from '../req/req.interceptor';
import { User, UseReqResErr } from '../user/user.decorator';

// @UseGuards(AuthGuard)
// @useAuthGuard()
@Controller('demo2')
export class Demo2Controller {
  constructor(private readonly demo2Service: Demo2Service) {}

  @Get('/configs')
  getConfigs() {
    return this.demo2Service.getDemoConfig();
  }

  // @useUnNeedAuth(true)
  // @UnNeedAuth()
  @UseReqResErr()
  @Get('/hello')
  hello(@User('userId') userId: string) {
    return userId;
  }

  @UseReqResErr()
  @Get('/welcome')
  welcome(@User('userId') userId: string) {
    return userId;
  }

  // @UseGuards(AuthGuard)
  // @UseFilters(CustomErrorFilter)
  @UseInterceptors(ErrorInterceptor)
  @Get('/hello2')
  hello2() {
    // return '嗨，哥们，喝多了啊。';
    // throw new Error('真牛')
    throw new CustomException(BusinessErrorStatus.BE_DRUNK);
    // throw new HttpException('牛哇', HttpStatus.BAD_GATEWAY);
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createDemo2Dto: CreateDemo2Dto) {
    return createDemo2Dto;
  }

  @Get()
  findAll() {
    return this.demo2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseArrayPipe) id: Array<any>) {
    return id;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemo2Dto: UpdateDemo2Dto) {
    return this.demo2Service.update(+id, updateDemo2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demo2Service.remove(+id);
  }
}
