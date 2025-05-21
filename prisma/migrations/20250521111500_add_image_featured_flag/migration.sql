/*
  Warnings:

  - A unique constraint covering the columns `[postId,featured]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Image_postId_featured_key" ON "Image"("postId", "featured");
