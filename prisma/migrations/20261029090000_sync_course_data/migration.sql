-- Data migration: sync course levels, durations and assessment bodies with lib/site-data.ts.
-- Idempotent: safe to run against a database that was already seeded.

-- Remove courses that were renamed or moved to another department
DELETE c FROM `Course` c JOIN `Department` d ON d.`id` = c.`departmentId` WHERE d.`slug` = 'building' AND c.`name` = 'Welding';
DELETE c FROM `Course` c JOIN `Department` d ON d.`id` = c.`departmentId` WHERE d.`slug` = 'ict' AND c.`name` IN ('Computing and Informatics (Level 6)', 'Computing and Informatics (Level 5)', 'Computing and Informatics (Level 4)');

-- Insert missing courses and update existing ones (unique on departmentId + name)
-- Electrical & Electronics Engineering
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Solar PV Installation (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Electronics Engineering (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Electronics Engineering (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Electrical Engineering (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Electrical Engineering (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Electrical Engineering (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Electrical Installation Technology (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Electrical Installation', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 7, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'electrical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

-- Building & Civil Engineering
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Land Survey (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Masonry (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Plumbing (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Plumbing (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Civil Engineering (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Civil Engineering (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Building Technology (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Building Technology (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 7, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Carpentry & Joinery (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 8, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Masonry', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 9, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Plumbing and Pipe Fitting', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 10, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Carpentry', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 11, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'building'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

-- Computing and Informatics
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'ICT Technician (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'ICT Technician (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'ICT Assistant (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Cyber Security (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Cyber Security (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Cyber Security (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Computer Science (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Computer Packages', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 7, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'ict'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

-- Tourism & Hospitality
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Catering & Accommodation (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Catering & Accommodation (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Tourism & Travel Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Tourism & Travel Management (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Food & Beverages — Culinary Arts (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Food & Beverages — Culinary Arts (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Food & Beverages — Culinary Arts (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'House Keeping & Accommodation (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 7, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'House Keeping & Accommodation (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 8, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Food and Beverage Production', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 9, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'hospitality'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

-- Mechanical Engineering
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Automotive Technology (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Automotive Technology (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Automotive Technology (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Welding & Fabrication (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Welding & Fabrication (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Welding & Fabrication (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Motorcycle', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Motor Vehicle Mechanics', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 7, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'mechanical'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

-- Fashion & Cosmetology
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Fashion & Design (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Fashion & Design (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Fashion & Design (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Cosmetology (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Cosmetology (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Cosmetology (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Hairdressing', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Beauty Therapy', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 7, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Dress Making', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 8, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'fashion'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

-- Agricultural Studies
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Agri-preneurship (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'agriculture'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Agri-preneurship (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'agriculture'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Agricultural Extension (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'agriculture'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Agricultural Extension (Level 4)', 'KCSE', '6 Months', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'agriculture'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Agri-preneurship', 'Open', '6 Months', 'Godoma Technical Training Institute', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'agriculture'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

-- Business & Liberal Studies
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Supply Chain Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Supply Chain Management (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Human Resource Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Human Resource Management (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Business Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Business Management (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Social Work & Community Development (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);
INSERT INTO `Course` (`id`, `departmentId`, `name`, `requirement`, `duration`, `examiner`, `status`, `publishedAt`, `sortOrder`, `createdAt`, `updatedAt`)
SELECT UUID(), d.`id`, 'Social Work & Community Development (Level 5)', 'D-', '2 Years', 'TVET CDACC', 'PUBLISHED', CURRENT_TIMESTAMP(3), 7, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3) FROM `Department` d WHERE d.`slug` = 'business'
ON DUPLICATE KEY UPDATE `requirement` = VALUES(`requirement`), `duration` = VALUES(`duration`), `examiner` = VALUES(`examiner`), `sortOrder` = VALUES(`sortOrder`), `updatedAt` = CURRENT_TIMESTAMP(3);

