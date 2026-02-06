import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    minLength: 10,
    maxLength: 300,
    example: 'Очень полезная публикация, спасибо!',
  })
  @IsString()
  @Length(10, 300)
  message: string;
}
