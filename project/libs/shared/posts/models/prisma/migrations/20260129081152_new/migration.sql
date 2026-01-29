/*
  Warnings:

  - You are about to drop the column `announcement` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `linkDescription` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `linkUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `quoteAuthor` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "announcement",
DROP COLUMN "content",
DROP COLUMN "linkDescription",
DROP COLUMN "linkUrl",
DROP COLUMN "photoUrl",
DROP COLUMN "quoteAuthor",
DROP COLUMN "title",
DROP COLUMN "videoUrl";

-- CreateTable
CREATE TABLE "PostVideo" (
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,

    CONSTRAINT "PostVideo_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "PostText" (
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "PostText_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "PostQuote" (
    "postId" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "quoteAuthor" TEXT NOT NULL,

    CONSTRAINT "PostQuote_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "PostPhoto" (
    "postId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "PostPhoto_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "PostLink" (
    "postId" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,
    "linkDescription" TEXT,

    CONSTRAINT "PostLink_pkey" PRIMARY KEY ("postId")
);

-- AddForeignKey
ALTER TABLE "PostVideo" ADD CONSTRAINT "PostVideo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostText" ADD CONSTRAINT "PostText_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostQuote" ADD CONSTRAINT "PostQuote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostPhoto" ADD CONSTRAINT "PostPhoto_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLink" ADD CONSTRAINT "PostLink_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
