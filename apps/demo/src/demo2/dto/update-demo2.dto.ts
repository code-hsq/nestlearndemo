import { PartialType } from '@nestjs/mapped-types';
import { CreateDemo2Dto } from './create-demo2.dto';

export class UpdateDemo2Dto extends PartialType(CreateDemo2Dto) {}
