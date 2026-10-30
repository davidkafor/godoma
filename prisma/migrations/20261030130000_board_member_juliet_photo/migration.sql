UPDATE `StaffProfile`
SET `photo` = '/images/board/juliet-mapenzi.jpeg'
WHERE `group` = 'BOARD' AND `name` = 'Juliet Mapenzi Rua' AND (`photo` IS NULL OR `photo` = '');
