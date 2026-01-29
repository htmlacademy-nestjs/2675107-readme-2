import { PrismaClient } from '@prisma/client';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

export enum PostType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUOTE = 'QUOTE',
  PHOTO = 'PHOTO',
  LINK = 'LINK',
}

function getPosts() {
  return [
    {
      type: PostType.TEXT,
      title: 'Худеющий',
      announcement: 'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
      content: 'Недавно прочитал страшный роман «Худеющий».',
      authorId: FIRST_USER_ID,
      tags: ['книги', 'ужасы'],
      comments: [
        { message: 'Очень интересная книга!', userId: FIRST_USER_ID },
        { message: 'Хочу прочитать.', userId: SECOND_USER_ID },
      ],
    },
    {
      type: PostType.VIDEO,
      title: 'JavaScript для начинающих',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      authorId: FIRST_USER_ID,
      tags: ['js', 'обучение'],
      comments: [
        { message: 'Отличное видео!', userId: FIRST_USER_ID },
      ],
    },
    {
      type: PostType.QUOTE,
      quote: 'Учение — свет, а неучение — тьма.',
      quoteAuthor: 'Сократ',
      authorId: SECOND_USER_ID,
      tags: ['цитаты', 'философия'],
    },
    {
      type: PostType.PHOTO,
      photoUrl: 'https://example.com/photo.jpg',
      authorId: SECOND_USER_ID,
      tags: ['фото', 'пейзаж'],
    },
    {
      type: PostType.LINK,
      linkUrl: 'https://nestjs.com/',
      linkDescription: 'Документация по NestJS',
      authorId: FIRST_USER_ID,
      tags: ['nestjs', 'backend'],
    },
  ];
}

function assertDefined<T>(value: T | undefined, fieldName: string): T {
  if (value === undefined) {
    throw new Error(`Field ${fieldName} is required but got undefined`);
  }
  return value;
}

async function seedDb(prisma: PrismaClient) {
  const posts = getPosts();

  for (const p of posts) {
    const postMeta = await prisma.post.create({
      data: {
        type: assertDefined(p.type, 'type'),
        status: 'PUBLISHED',
        authorId: p.authorId,
        tags: p.tags ?? [],
        publishedAt: new Date(),
      },
    });
    switch (p.type) {
      case 'TEXT':
        await prisma.postText.create({
          data: {
            postId: postMeta.id,
            title: assertDefined(p.title, 'title'),
            announcement: assertDefined(p.announcement, 'announcement'),
            content: assertDefined(p.content, 'content'),
          },
        });
        break;

      case 'VIDEO':
        await prisma.postVideo.create({
          data: {
            postId: postMeta.id,
            title: assertDefined(p.title, 'title'),
            videoUrl: assertDefined(p.videoUrl, 'videoUrl'),
          },
        });
        break;

      case 'QUOTE':
        await prisma.postQuote.create({
          data: {
            postId: postMeta.id,
            quote: assertDefined(p.quote, 'quote'),
            quoteAuthor: assertDefined(p.quoteAuthor, 'quoteAuthor'),
          },
        });
        break;

      case 'PHOTO':
        await prisma.postPhoto.create({
          data: {
            postId: postMeta.id,
            photoUrl: assertDefined(p.photoUrl, 'photoUrl'),
          },
        });
        break;

      case 'LINK':
        await prisma.postLink.create({
          data: {
            postId: postMeta.id,
            linkUrl: assertDefined(p.linkUrl, 'linkUrl'),
            linkDescription: p.linkDescription,
          },
        });
        break;
    }
    if (p.comments?.length) {
      for (const c of p.comments) {
        await prisma.comment.create({
          data: {
            postId: postMeta.id,
            message: c.message,
            userId: c.userId,
          },
        });
      }
    }
  }

  console.info('✅ Database seeded successfully!');
}

async function bootstrap() {
  const prisma = new PrismaClient();

  try {
    await seedDb(prisma);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();
