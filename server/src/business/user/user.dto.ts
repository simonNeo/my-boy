import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  account: string;

  @IsString()
  pwd: string;
}

export class RegisterDto {
  @IsString()
  account: string;

  @IsString()
  pwd: string;
}

export class EditBabyInfoDto {
  @IsString()
  babyName: string;

  @IsString()
  babyBirthday: string;
}
