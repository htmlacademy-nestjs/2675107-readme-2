import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostRdo {
  @ApiProperty()
  @Expose()
  public id: string;

  @ApiProperty()
  @Expose()
  public authorId: string;

  @ApiProperty()
  @Expose()
  public likesCount: number;

  @ApiProperty()
  @Expose()
  public commentsCount: number;

  @ApiProperty()
  @Expose()
  public createdAt: Date;

  @ApiProperty()
  @Expose()
  public publishedAt: Date;
}
