/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Profile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id", "lrn", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");
