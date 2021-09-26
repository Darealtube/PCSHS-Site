/*
  Warnings:

  - You are about to drop the column `branch` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Member` table. All the data in the column will be lost.
  - Added the required column `image` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "branch",
DROP COLUMN "role",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT;
