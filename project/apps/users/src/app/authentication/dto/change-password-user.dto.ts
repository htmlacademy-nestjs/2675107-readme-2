import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { AUTH_USER_PASSWORD_NOT_VALID } from '../authentication.constant';

export class ChangePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString({ message: AUTH_USER_PASSWORD_NOT_VALID })
  public currentPassword: string;

  @ApiProperty({ example: 'newpass123' })
  @IsString({ message: AUTH_USER_PASSWORD_NOT_VALID })
  @Length(6, 12, { message: AUTH_USER_PASSWORD_NOT_VALID })
  public newPassword: string;
}
