-- CreateEnum
CREATE TYPE "MemeType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meme" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" "MemeType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemeTag" (
    "memeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "MemeTag_pkey" PRIMARY KEY ("memeId","tagId")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "memeId" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saves" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "memeId" TEXT NOT NULL,

    CONSTRAINT "Saves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_userId_memeId_key" ON "Likes"("userId", "memeId");

-- CreateIndex
CREATE UNIQUE INDEX "Saves_userId_memeId_key" ON "Saves"("userId", "memeId");

-- AddForeignKey
ALTER TABLE "Meme" ADD CONSTRAINT "Meme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemeTag" ADD CONSTRAINT "MemeTag_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemeTag" ADD CONSTRAINT "MemeTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saves" ADD CONSTRAINT "Saves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saves" ADD CONSTRAINT "Saves_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
