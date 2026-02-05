import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  public currentPassword: string;

  @ApiProperty({ example: 'newpass123' })
  @IsString()
  @Length(6, 12)
  public newPassword: string;
}
