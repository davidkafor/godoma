-- AlterTable
ALTER TABLE `ContentPage`
    ADD COLUMN `heroImage` VARCHAR(500) NULL,
    ADD COLUMN `videoUrl` VARCHAR(500) NULL,
    ADD COLUMN `inMenu` BOOLEAN NOT NULL DEFAULT false;
