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
} from '@nestjs/common';
import { Demo2Service } from './demo2.service';
import { CreateDemo2Dto } from './dto/create-demo2.dto';
import { UpdateDemo2Dto } from './dto/update-demo2.dto';
import { BusinessErrorStatus, CustomErrorFilter, CustomException } from '../custom-error/custom-error.filter';
import { AuthGuard, useAuthGuard } from '../auth/auth.guard';
import { UnNeedAuth, useUnNeedAuth } from '../un-need-auth/un-need-auth.decorator';


// @UseGuards(AuthGuard)
@useAuthGuard()
@Controller('demo2')
export class Demo2Controller {
  constructor(private readonly demo2Service: Demo2Service) { }

  // @useUnNeedAuth(true)
  @UnNeedAuth()
  @Get('/hello')
  hello() {
    return '嗨，哥们。';
  }

  // @UseGuards(AuthGuard)
  // @UseFilters(CustomErrorFilter)
  @Get('/hello2')
  hello2() {
    // return '嗨，哥们，喝多了啊。';
    // throw new Error('真牛')
    throw new CustomException(BusinessErrorStatus.BE_DRUNK)
    // throw new HttpException('牛哇', HttpStatus.BAD_GATEWAY)
  }

  @Post()
  create(@Body() createDemo2Dto: CreateDemo2Dto) {
    // console.log(createDemo2Dto, createDemo2Dto instanceof CreateDemo2Dto);
    return createDemo2Dto;
  }

  @Get()
  findAll() {
    return this.demo2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demo2Service.findOne(+id);
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
