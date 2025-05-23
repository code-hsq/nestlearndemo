import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageDto } from './dto/page.dto';
import { UserErrorStatus, UserException } from '../app.error';
import { NeedVip, UnNeedAuth, useAuthGuard, User } from '@app/auth';

@useAuthGuard()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: PageDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @NeedVip(1)
  @Post('/test')
  testMongo(@User() user) {
    return user;
  }

  @UnNeedAuth()
  @Post('/login')
  login(@Body() user: CreateUserDto) {
    return this.userService.login(user);
  }
}
