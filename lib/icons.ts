// Icon names editors can pick for facilities. The public Facilities section maps these to lucide icons.
export const facilityIconNames = [
  'Wrench',
  'Cpu',
  'Wifi',
  'BedDouble',
  'HeartPulse',
  'BookOpen',
  'Utensils',
  'Dumbbell',
  'FlaskConical',
  'Bus',
  'ShieldCheck',
  'Sprout',
] as const

export type FacilityIconName = (typeof facilityIconNames)[number]
