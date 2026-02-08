/*
  Warnings:

  - You are about to drop the column `gymId` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "gymId",
DROP COLUMN "userId";
