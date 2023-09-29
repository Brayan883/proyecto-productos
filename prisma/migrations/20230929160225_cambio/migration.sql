/*
  Warnings:

  - Added the required column `usuarioId` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `categoria` ADD CONSTRAINT `categoria_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `user`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;
