/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `lrn` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_authorName_fkey";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "authorName" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "lrn" SET NOT NULL,
ALTER COLUMN "lrn" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "contact" SET DATA TYPE VARCHAR(11),
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("lrn", "name");

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "Profile"("name") ON DELETE SET NULL ON UPDATE CASCADE;
