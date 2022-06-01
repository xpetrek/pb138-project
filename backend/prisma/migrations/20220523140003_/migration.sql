/*
  Warnings:

  - Added the required column `pricePerDay` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "pricePerDay" DECIMAL(65,30) NOT NULL;
