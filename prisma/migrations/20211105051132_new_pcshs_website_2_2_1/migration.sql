/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `day` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Event_date_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
