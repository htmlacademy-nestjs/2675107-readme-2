import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ShowUserRdo {

  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose()
  public id: string;


  @ApiProperty({
    description: 'Users followers',
    example: '2'
  })
  @Expose()
  public followers: number;

  @ApiProperty({
    description: 'Users following',
    example: '5'
  })
  @Expose()
  public following: number;

  @ApiProperty({
    description: 'Users date registry',
    example: '2025-10-25'
  })
  @Expose()
  public dateRegistry: Date;

  @ApiProperty({
    description: 'Users post count public',
    example: '15'
  })
  @Expose()
  public postsCount: number;
}
