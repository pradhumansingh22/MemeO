/*
  Warnings:

  - Added the required column `caption` to the `Meme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meme" ADD COLUMN     "caption" TEXT NOT NULL;
