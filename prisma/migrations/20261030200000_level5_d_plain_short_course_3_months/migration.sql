UPDATE `Course`
SET `requirement` = 'D (Plain)'
WHERE `requirement` = 'D-' AND `name` LIKE '%(Level 5)%';

UPDATE `Course`
SET `duration` = '3 Months'
WHERE `requirement` = 'Open' AND `duration` = '6 Months';

UPDATE `ContentPage`
SET `intro` = REPLACE(`intro`, '6-month short courses', '3-month short courses')
WHERE `slug` = 'admissions';
