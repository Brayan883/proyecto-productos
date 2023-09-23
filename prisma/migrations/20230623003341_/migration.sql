-- CreateTable
CREATE TABLE `Producto` (
    `IdProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `stock` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `marca` VARCHAR(191) NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `categoriaId` INTEGER NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`IdProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `IdCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`IdCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`IdCategoria`) ON DELETE SET NULL ON UPDATE SET NULL;
