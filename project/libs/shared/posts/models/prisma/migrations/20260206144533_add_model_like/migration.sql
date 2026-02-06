/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostQuote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostText` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostLink" DROP CONSTRAINT "PostLink_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostPhoto" DROP CONSTRAINT "PostPhoto_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostQuote" DROP CONSTRAINT "PostQuote_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostText" DROP CONSTRAINT "PostText_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostVideo" DROP CONSTRAINT "PostVideo_postId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostLink";

-- DropTable
DROP TABLE "PostPhoto";

-- DropTable
DROP TABLE "PostQuote";

-- DropTable
DROP TABLE "PostText";

-- DropTable
DROP TABLE "PostVideo";

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "authorId" TEXT NOT NULL,
    "originalPostId" TEXT,
    "originalAuthorId" TEXT,
    "isRepost" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post-video" (
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,

    CONSTRAINT "post-video_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "post-text" (
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "post-text_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "post-quote" (
    "postId" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "quoteAuthor" TEXT NOT NULL,

    CONSTRAINT "post-quote_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "post-photo" (
    "postId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "post-photo_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "post-link" (
    "postId" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,
    "linkDescription" TEXT,

    CONSTRAINT "post-link_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "likes_post_id_idx" ON "likes"("post_id");

-- AddForeignKey
ALTER TABLE "post-video" ADD CONSTRAINT "post-video_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-text" ADD CONSTRAINT "post-text_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-quote" ADD CONSTRAINT "post-quote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-photo" ADD CONSTRAINT "post-photo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-link" ADD CONSTRAINT "post-link_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
