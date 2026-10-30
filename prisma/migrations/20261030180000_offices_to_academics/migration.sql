UPDATE `ContentPage`
SET `eyebrow` = 'Academics'
WHERE `slug` IN ('recognition-of-prior-learning', 'industrial-liaison-office', 'iqa', 'assessment-office')
  AND `eyebrow` = 'Administration';
