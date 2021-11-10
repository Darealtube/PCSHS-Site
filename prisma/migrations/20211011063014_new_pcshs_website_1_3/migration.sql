/*
  Warnings:

  - You are about to drop the column `authorId` on the `Announcement` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `lrn` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(12)`.
  - You are about to alter the column `name` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(40)`.
  - You are about to alter the column `contact` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_authorId_fkey";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "authorId",
ADD COLUMN     "authorName" CHAR(40);

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "lrn" SET DATA TYPE CHAR(12),
ALTER COLUMN "name" SET DATA TYPE CHAR(40),
ALTER COLUMN "contact" SET DATA TYPE CHAR(11),
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "Profile"("name") ON DELETE SET NULL ON UPDATE CASCADE;
