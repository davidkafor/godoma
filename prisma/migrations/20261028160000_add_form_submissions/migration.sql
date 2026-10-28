-- CreateTable
CREATE TABLE IF NOT EXISTS `Application` (
    `id` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(32) NOT NULL,
    `idempotencyKey` VARCHAR(64) NOT NULL,
    `fingerprint` VARCHAR(64) NOT NULL,
    `fullName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `phone` VARCHAR(24) NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `programme` VARCHAR(255) NOT NULL,
    `qualification` VARCHAR(100) NOT NULL,
    `notes` TEXT NULL,
    `status` ENUM('NEW', 'IN_REVIEW', 'CONTACTED', 'ADMITTED', 'DECLINED', 'ARCHIVED') NOT NULL DEFAULT 'NEW',
    `emailStatus` ENUM('PENDING', 'SENT', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `emailAttempts` INTEGER NOT NULL DEFAULT 0,
    `emailAttemptedAt` DATETIME(3) NULL,
    `emailSentAt` DATETIME(3) NULL,
    `emailError` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Application_reference_key`(`reference`),
    UNIQUE INDEX `Application_idempotencyKey_key`(`idempotencyKey`),
    INDEX `Application_createdAt_idx`(`createdAt`),
    INDEX `Application_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `Application_emailStatus_createdAt_idx`(`emailStatus`, `createdAt`),
    INDEX `Application_fingerprint_createdAt_idx`(`fingerprint`, `createdAt`),
    INDEX `Application_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `ContactMessage` (
    `id` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(32) NOT NULL,
    `idempotencyKey` VARCHAR(64) NOT NULL,
    `fingerprint` VARCHAR(64) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `subject` VARCHAR(150) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('NEW', 'READ', 'REPLIED', 'ARCHIVED') NOT NULL DEFAULT 'NEW',
    `emailStatus` ENUM('PENDING', 'SENT', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `emailAttempts` INTEGER NOT NULL DEFAULT 0,
    `emailAttemptedAt` DATETIME(3) NULL,
    `emailSentAt` DATETIME(3) NULL,
    `emailError` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ContactMessage_reference_key`(`reference`),
    UNIQUE INDEX `ContactMessage_idempotencyKey_key`(`idempotencyKey`),
    INDEX `ContactMessage_createdAt_idx`(`createdAt`),
    INDEX `ContactMessage_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `ContactMessage_emailStatus_createdAt_idx`(`emailStatus`, `createdAt`),
    INDEX `ContactMessage_fingerprint_createdAt_idx`(`fingerprint`, `createdAt`),
    INDEX `ContactMessage_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `RateLimitHit` (
    `id` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(32) NOT NULL,
    `key` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RateLimitHit_scope_key_createdAt_idx`(`scope`, `key`, `createdAt`),
    INDEX `RateLimitHit_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

