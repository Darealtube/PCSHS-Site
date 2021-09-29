/*
  Warnings:

  - Added the required column `ssg` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "ssg" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "SSGAnnouncement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "authorId" INTEGER,

    CONSTRAINT "SSGAnnouncement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SSGAnnouncement_id_key" ON "SSGAnnouncement"("id");

-- AddForeignKey
ALTER TABLE "SSGAnnouncement" ADD CONSTRAINT "SSGAnnouncement_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Student"("lrn") ON DELETE SET NULL ON UPDATE CASCADE;
