import {
  IsEmail,
  IsEnum,
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  MaxLength,
  Validate,
} from 'class-validator';

enum userTypeEnum {
  USER,
  ADMIN,
  CRM,
  READ_ONLY,
  SUPER_ADMIN,
}

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsEnum(userTypeEnum)
  userType: string;

  @IsNotEmpty()
  @IsNumber()
  mobile: number;
}
