import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export class UpdateUserDto extends PickType(CreateUserDto, ['password']) {}
// export class UpdateUserDto extends OmitType(CreateUserDto, ['userName']) {}

// export class UpdateUserDto extends IntersectionType(
//   OmitType(CreateUserDto, ['userName']),
//   PickType(CreateUserDto, ['userName']),
// ) {}
