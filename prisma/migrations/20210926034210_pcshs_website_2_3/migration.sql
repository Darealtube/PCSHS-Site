/*
  Warnings:

  - You are about to drop the column `subject` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "subject",
ADD COLUMN     "role" TEXT,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;
