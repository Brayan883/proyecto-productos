/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `categoria` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `categoria_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `usuarioId`;
