UPDATE `StaffProfile`
SET `photo` = '/images/board/moses-kesis.jpeg'
WHERE `group` = 'BOARD' AND `name` = 'Moses Kesis' AND (`photo` IS NULL OR `photo` = '');
