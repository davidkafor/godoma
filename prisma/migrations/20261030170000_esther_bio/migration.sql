UPDATE `StaffProfile`
SET `bio` = REPLACE(`bio`, 'Hails from Muranga County, currently working at', 'Currently working at')
WHERE `group` = 'BOARD' AND `name` = 'Esther Njoki Gacheru';
