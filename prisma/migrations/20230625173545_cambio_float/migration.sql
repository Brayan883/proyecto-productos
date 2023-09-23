/*
  Warnings:

  - You are about to alter the column `precio` on the `producto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `producto` MODIFY `precio` DOUBLE NOT NULL DEFAULT 0.00;
