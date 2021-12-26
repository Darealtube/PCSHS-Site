/*
  Warnings:

  - You are about to alter the column `current_section` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "current_section" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "contact" SET DATA TYPE CHAR(11);
