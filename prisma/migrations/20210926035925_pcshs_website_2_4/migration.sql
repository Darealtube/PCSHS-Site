/*
  Warnings:

  - The `position` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "position",
ADD COLUMN     "position" TEXT[],
DROP COLUMN "role",
ADD COLUMN     "role" TEXT[];
