import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostRdo {
  @ApiProperty()
  @Expose()
  public id: string;

  @ApiProperty()
  @Expose()
  public title: string;

  @ApiProperty()
  @Expose()
  public content: string;

  @ApiProperty()
  @Expose()
  public authorId: string;

  @ApiProperty()
  @Expose()
  public createdAt: Date;

  @ApiProperty()
  @Expose()
  public tags: string[];
}
