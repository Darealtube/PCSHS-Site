/*
  Warnings:

  - The `image` column on the `Announcement` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
