import { coreValues, mandate } from '@/lib/site-data'

export const homeSectionKeys = ['principal', 'videoNews', 'about', 'stats', 'admissions', 'facilities', 'testimonials', 'partners'] as const
export type HomeSectionKey = (typeof homeSectionKeys)[number]

export const homeSectionLabels: Record<HomeSectionKey, string> = {
  principal: 'Message from the principal',
  videoNews: 'Introduction video and latest news',
  about: 'About, vision, mission and values',
  stats: 'Numbers strip',
  admissions: 'Admissions and entry requirements',
  facilities: 'Facilities',
  testimonials: 'Testimonials',
  partners: 'Partners',
}

export type StatSource = 'courses' | 'departments' | 'custom'
export type HomeStat = { label: string; source: StatSource; value: number }

export type HomeContent = {
  layout: { key: HomeSectionKey; visible: boolean }[]
  principal: { photo: string; name: string; role: string; eyebrow: string; heading: string; paragraphs: string[]; linkLabel: string; linkHref: string }
  video: { eyebrow: string; heading: string; badge: string; url: string; poster: string; description: string; linkLabel: string; linkHref: string }
  about: {
    image: string
    badgeValue: string
    badgeText: string
    eyebrow: string
    heading: string
    historyTitle: string
    history: string[]
    location: string
    visionTitle: string
    vision: string
    missionTitle: string
    mission: string
    valuesTitle: string
    valuesIntro: string
    values: string[]
    mandateTitle: string
    mandateIntro: string
    mandate: string[]
  }
  stats: HomeStat[]
  admissions: { eyebrow: string; heading: string; intro: string; helbTitle: string; helbText: string; applyLabel: string; portalLabel: string; tableTitle: string; tableNote: string; footnote: string }
  footer: { tagline: string }
}

export const defaultHome: HomeContent = {
  layout: homeSectionKeys.map((key) => ({ key, visible: true })),
  principal: {
    photo: '/images/principal-portrait-updated.webp',
    name: 'Caroline Musyimi',
    role: 'Principal',
    eyebrow: 'A message from the principal',
    heading: 'Welcome to Godoma TTI',
    paragraphs: [
      'Welcome to Godoma Technical Training Institute (GTTI), where we are committed to empowering individuals with practical skills, knowledge, and competencies for employment, entrepreneurship, and lifelong learning.',
      'Located in Vitengeni, Ganze Sub-County, Kilifi County, Godoma TTI provides technical and vocational education and training aimed at nurturing competent, innovative, and responsible graduates who can contribute meaningfully to national development. We offer a wide range of programmes designed to respond to industry needs and equip our trainees for a changing world of work.',
      'At Godoma, we believe that every learner deserves an opportunity to succeed. We are committed to providing a supportive learning environment that promotes skills development, innovation, integrity, inclusivity, and excellence. Through partnerships with industry, government, and our community, we continue to strengthen the relevance and quality of our training.',
      'As we look to the future, our focus remains on expanding access to quality training, embracing innovation and technology, and creating opportunities for our trainees to transform their lives and communities.',
      'I invite prospective trainees, parents, employers, development partners, and other stakeholders to explore our website, discover our programmes, and partner with us in building a skilled and productive society.',
      'Welcome to Godoma TTI — where skills are nurtured, talents are developed, and futures are transformed.',
    ],
    linkLabel: 'Read about Godoma TTI',
    linkHref: '/about',
  },
  video: {
    eyebrow: 'Discover Godoma TTI',
    heading: 'Welcome to our institute',
    badge: 'Watch',
    url: 'https://www.youtube.com/watch?v=99wCSA5pWp8',
    poster: '',
    description: 'Explore our practical training environment, departments, and the opportunities available to every learner.',
    linkLabel: 'About us',
    linkHref: '/about',
  },
  about: {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_0629.JPG-soKPoC81P7sfduc2B6eygNXs4Fh8Ki.jpeg',
    badgeValue: '2016',
    badgeText: 'Commissioned in November',
    eyebrow: 'About Godoma TTI',
    heading: 'A Centre of Excellence in Technological Training',
    historyTitle: 'Brief History',
    history: [
      'Godoma Technical Training Institute is the first public sub-county technical training institute, located in Vitengeni near Kilifi County. The institute was commissioned in November 2016 and is a major pillar in the realization of Vision 2030 by providing skilled manpower to the growing economy of the Republic.',
      'GTTI is a leading technical institute in Kilifi County, located in the serene suburbs of Kilifi town bordering the famous Dida Forest. The hospitality of the local community makes GTTI a welcoming haven for learners and promotes peaceful coexistence.',
      'The institute boasts sufficient resources for quality learning and research, including modern workshops, modern ICT laboratories, and dedicated teaching and non-teaching staff who foster learning and innovation.',
    ],
    location: 'Matanomane, Vitengeni Rd, Kilifi',
    visionTitle: 'Our Vision',
    vision: 'A Centre of excellence in technical training, research and business incubation.',
    missionTitle: 'Our Mission',
    mission:
      'To produce quality technical and entrepreneurial skills and competencies to satisfy the middle level manpower needs of the local and international markets through practical, hands-on training, and research.',
    valuesTitle: 'Core Values',
    valuesIntro: 'Enduring values that guide us through changing times and shape our Mission, Vision, and Goals.',
    values: [...coreValues],
    mandateTitle: 'Our Mandate',
    mandateIntro: 'Established by the Ministry of Education under the Directorate of Technical and Vocational Education and Training (TVET) with a specific mandate to:',
    mandate: [...mandate],
  },
  stats: [
    { label: 'Courses Offered', source: 'courses', value: 0 },
    { label: 'Academic Departments', source: 'departments', value: 0 },
    { label: 'Training Levels', source: 'custom', value: 3 },
    { label: 'Year Established', source: 'custom', value: 2016 },
  ],
  admissions: {
    eyebrow: 'Admissions',
    heading: 'Start Your Technical Career at Godoma TTI',
    intro:
      'Applications are accepted online and offline for the January, May and September intakes. Submit photocopies of your National ID, birth certificate, KCSE and KCPE result slips, and leaving certificate addressed to the Principal, Godoma Technical Training Institute.',
    helbTitle: 'HELB TVET loans & bursaries',
    helbText: 'Up to Kshs. 40,000 per year, upkeep inclusive, for eligible TVET CDACC trainees.',
    applyLabel: 'Apply Now!',
    portalLabel: 'Students Portal',
    tableTitle: 'Entry Requirements',
    tableNote: 'Current minimum entry requirements for Godoma TTI programmes.',
    footnote: 'Applicants should also submit the required identification and academic documents listed on this page.',
  },
  footer: { tagline: 'A centre of excellence in technical training, research and business incubation in Kilifi County.' },
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

/** Layers stored values over the defaults, ignoring anything with the wrong shape. */
export function mergeHome(stored: unknown): HomeContent {
  if (!isObject(stored)) return defaultHome
  const out: Record<string, unknown> = { ...defaultHome }
  for (const key of Object.keys(defaultHome) as (keyof HomeContent)[]) {
    const base = defaultHome[key]
    const value = stored[key]
    if (value === undefined) continue
    if (Array.isArray(base)) {
      if (Array.isArray(value)) out[key] = value
    } else if (isObject(base) && isObject(value)) {
      const merged: Record<string, unknown> = { ...base }
      for (const [k, v] of Object.entries(value)) {
        const baseValue = (base as Record<string, unknown>)[k]
        if (baseValue !== undefined && typeof baseValue === typeof v && Array.isArray(baseValue) === Array.isArray(v)) merged[k] = v
      }
      out[key] = merged
    }
  }
  const layout = (out.layout as HomeContent['layout']).filter((s) => homeSectionKeys.includes(s.key))
  for (const key of homeSectionKeys) if (!layout.some((s) => s.key === key)) layout.push({ key, visible: true })
  out.layout = layout
  return out as HomeContent
}
