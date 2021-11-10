/*
  Warnings:

  - You are about to alter the column `header` on the `Announcement` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `body` on the `Announcement` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1500)`.
  - You are about to alter the column `footer` on the `Announcement` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(800)`.

*/
-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "header" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "body" SET DATA TYPE VARCHAR(1500),
ALTER COLUMN "footer" SET DATA TYPE VARCHAR(800);
