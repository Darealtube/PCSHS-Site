/*
  Warnings:

  - You are about to drop the column `credentials` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "credentials",
ADD COLUMN     "about" TEXT;
