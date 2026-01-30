import { Prisma } from '@prisma/client';
import { PostStatus } from '@project/shared/app/types';

export interface PostFilter {
  id?: string;
  commentsCount?: number;
  likesCount?: number,
  authorId?: string
  status?: PostStatus
}

export function postFilterToPrisma(filter: PostFilter): Prisma.PostWhereInput | undefined {
  if (! filter) {
    return undefined;
  }

  let prismaFilter: Prisma.PostWhereInput = {};

  if (filter.commentsCount) {
    prismaFilter = { commentsCount: filter.commentsCount };
  }

  if (filter.authorId) {
    prismaFilter = { authorId: filter.authorId };
  }

  if (filter.status) {
    prismaFilter = { status: filter.status };
  }


  return prismaFilter;
}
