import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";
import { AUTH_USER_EMAIL_NOT_VALID, AUTH_USER_NAME_NOT_VALID, AUTH_USER_PASSWORD_NOT_VALID } from "../authentication.constant";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks Keksov',
  })
  @Length(2, 15, { message: AUTH_USER_NAME_NOT_VALID })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @Length(6, 15, { message: AUTH_USER_PASSWORD_NOT_VALID })
  public password: string;
}
