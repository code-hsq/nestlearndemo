import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongodbService, PrismaService } from '@app/prisma';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { PageDto } from './dto/page.dto';
import { RedisService } from '@app/redis';
import { AuthService } from '@app/auth';
import { UserErrorStatus, UserException } from '../app.error';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject(MongodbService)
  private mongodbService: MongodbService;

  @Inject(RedisService)
  private redis: RedisService;

  @Inject(AuthService)
  private authService: AuthService;

  private readonly keyLength = 32;

  async hashPassword(password: string): Promise<string> {
    const scryptAsync = promisify(scrypt);
    const salt = randomBytes(16).toString('hex');
    const hash = (await scryptAsync(password, salt, this.keyLength)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }
  async verifyPassword(storedHash: string, password: string): Promise<boolean> {
    const scryptAsync = promisify(scrypt);
    const [salt, hash] = storedHash.split('.');
    const generatedHash = (await scryptAsync(
      password,
      salt,
      this.keyLength,
    )) as Buffer;
    return hash === generatedHash.toString('hex');
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    await this.mongodbService.userRegister.create({
      data: {
        userId: user.userId,
      },
    });
    return user;
  }

  findAll(page: PageDto) {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
      skip: page.pageSize * (page.pageNumber - 1),
      take: page.pageSize,
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      omit: {
        password: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    if (this.verifyPassword(user.password, updateUserDto.password)) {
      return '新旧密码相同';
    }
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        password: await this.hashPassword(updateUserDto.password),
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        userId: id,
      },
    });
  }

  async login(user: CreateUserDto) {
    const userData = await this.prisma.user.findUnique({
      where: {
        userName: user.userName,
      },
    });
    if (this.verifyPassword(user.password, userData.password)) {
      const loginMsg = await this.authService.login({
        userId: userData.userId,
      });
      return {
        ...loginMsg,
        nickname: userData.nickname,
      };
    }
    throw new UserException(UserErrorStatus.LOGIN_PWD_ERROR);
  }

  async test() {
    // return this.redis.get('token_cc433108-224b-4eb1-925f-0262365b6f37');
    return this.authService.verify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYzQzMzEwOC0yMjRiLTRlYjEtOTI1Zi0wMjYyMzY1YjZmMzciLCJpYXQiOjE3NDc5NzIyOTAsImV4cCI6MTc0ODU3NzA5MH0.EZPpArl8x0pLgxN8mkcgzJIXLR1-THpxvedVEAEOj0o',
    );
  }
}
