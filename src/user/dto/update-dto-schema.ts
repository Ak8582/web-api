import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-dto-schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
