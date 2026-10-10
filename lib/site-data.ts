export const OFFICIAL_SITE = 'https://godomatti.ac.ke'

export const contact = {
  phones: ['+254 702 363 304', '+254 720 755 952'],
  email: 'info@godomatti.ac.ke',
  address: 'Matanomane, Vitengeni Rd, Kilifi County, Kenya',
  mapEmbed:
    'https://www.google.com/maps?q=Godoma+Technical+Training+Institute,+Vitengeni,+Kilifi&output=embed',
}

// godomatti.ac.ke does not publish social handles; these point to platform searches until official URLs are confirmed.
export const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/search/top?q=Godoma%20Technical%20Training%20Institute' },
  { name: 'X', href: 'https://x.com/search?q=Godoma%20TTI' },
  { name: 'YouTube', href: 'https://www.youtube.com/results?search_query=Godoma+Technical+Training+Institute' },
] as const

export type NavItem = { label: string; href: string; external?: boolean }
export type NavGroup = { label: string; href: string; items?: NavItem[] }

export const navigation: NavGroup[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    items: [
      { label: 'Vision, Mission & Core Values', href: '/about' },
      { label: 'Brief History', href: '/about#history' },
      { label: 'Governance', href: '/governance' },
    ],
  },
  {
    label: 'Administration',
    href: '/administration',
    items: [
      { label: 'Council/BOG Chairperson', href: '/council-bog-chairperson' },
      { label: 'Principal Office', href: '/principal-office' },
      { label: 'Deputy Principal Office', href: '/deputy-principal-office' },
      { label: 'Dean of Students', href: '/dean-of-students' },
      { label: 'Registrar Office', href: '/registrar-office' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    items: [
      { label: 'Entry Requirements', href: '/admissions' },
      { label: 'HELB TVET Loans', href: '/admissions#funding' },
      { label: 'Accommodation', href: '/admissions#accommodation' },
      { label: 'Contact Admissions', href: '/contact' },
    ],
  },
  {
    label: 'Academics',
    href: '/departments',
    items: [
      { label: 'Electrical', href: '/departments/electrical' },
      { label: 'Building & Civil', href: '/departments/building' },
      { label: 'ICT', href: '/departments/ict' },
      { label: 'Hospitality', href: '/departments/hospitality' },
      { label: 'Business', href: '/departments/business' },
    ],
  },
  {
    label: 'Trainees',
    href: '/trainees',
    items: [
      { label: 'Students Portal', href: '/trainees#portal' },
      { label: 'E-Learning', href: '/trainees#elearning' },
      { label: 'Students Downloads', href: '/trainees#downloads' },
      { label: 'Aids Control Unit', href: '/trainees#aids-control' },
      { label: 'Events Calendar', href: '/trainees#events' },
    ],
  },
  { label: 'Library', href: '/library' },
  { label: 'Contact Us', href: '/contact' },
]

export const heroSlides = [
  {
    image: '/images/hero-campus.png',
    alt: 'Godoma TTI campus buildings surrounded by palm trees',
    eyebrow: 'Welcome to Godoma TTI',
    title: 'A Centre of Excellence in Technical Training',
    text: 'The first public sub-county technical training institute in Kilifi County, producing quality technical and entrepreneurial skills since 2016.',
  },
  {
    image: '/images/hero-workshop.png',
    alt: 'Trainees doing practical wiring in the electrical workshop',
    eyebrow: 'Practical, Hands-on Training',
    title: 'Modern Workshops. Real Skills.',
    text: 'Train in equipped electrical workshops, an electronics laboratory and modern ICT labs, guided by able teaching staff.',
  },
  {
    image: '/images/hero-graduation.png',
    alt: 'Graduates celebrating at a graduation ceremony',
    eyebrow: 'KNEC Examined Programmes',
    title: 'Diploma, Craft & Artisan Courses',
    text: 'Join 32 nationally examined programmes across five academic departments and build a career the economy needs.',
  },
]

export const news = [
  {
    title: 'HELB TVET Loans & Bursaries Now Available',
    date: 'Admissions',
    image: '/images/tvet-flier.jpg',
    excerpt:
      'HELB finances TVET students in over 200 technical institutes. Get up to Kshs. 40,000 per year, upkeep money inclusive, for Diploma and Certificate courses.',
    href: '/notice-board#helb-tvet-loans',
  },
  {
    title: 'Motivational Talk: The Bridge Between Goals and Accomplishment is Discipline',
    date: '18 March 2020',
    image: '/images/motivational-talk.jpg',
    excerpt:
      'The Office of the Dean of Students invites all staff and students to a talk on Corona Virus, HIV/AIDS, drugs, mental health and discipline at GTTI Phase II.',
    href: '/notice-board#motivational-talk',
  },
  {
    title: 'Godoma TTI Service Charter',
    date: 'Notice Board',
    image: '/images/service-charter-en.jpg',
    excerpt:
      'Read our service charter (English & Kiswahili) outlining the services we offer, our commitments, and the standards our customers can expect.',
    href: '/notice-board#service-charter',
  },
]

export const tickerItems = [
  'Admissions ongoing for Diploma, Craft Certificate and Artisan courses',
  'Apply for HELB TVET loans & bursaries — up to Kshs. 40,000 per year',
  'Download your admission letter from the Students Downloads page',
  'Computer Packages short course — 3 months, open entry',
  'Plans underway to become a NITA Exam Centre',
]

export const coreValues = ['Respect', 'Quality', 'Excellence', 'Integrity', 'Discipline', 'Equity', 'Team-work']

export const mandate = [
  'Provide technical training for the youth',
  'Prepare and guide trainees for evaluation by appropriate examining bodies',
  'Promote research, science, technology and innovation in all training programs',
  'Incubate entrepreneurship among the youth',
]

export type Course = { name: string; requirement: string; duration: string; examiner: string }
export type Department = {
  id: string
  name: string
  short: string
  image: string
  head: string
  summary: string
  courses: Course[]
}

const c = (name: string, requirement: string, duration: string, examiner = 'KNEC'): Course => ({
  name,
  requirement,
  duration,
  examiner,
})

export const departments: Department[] = [
  {
    id: 'electrical',
    name: 'Electrical & Electronics Engineering',
    short: 'Electrical',
    image: '/images/dept-electrical.png',
    head: 'Mr. Amos Chirchir',
    summary:
      'Established in 2016 to train manpower in both the Power and Instrumentation & Control options, with two equipped modern workshops — Electrical workshops and an Electronics laboratory.',
    courses: [
      c('Diploma in Electrical & Electronics Engineering (Power Option)', 'KCSE C-', '3 Years'),
      c('Diploma in Electrical & Electronics Engineering (Instrumentation & Control)', 'KCSE C-', '3 Years'),
      c('Certificate in Electrical & Electronics Engineering (Power Option)', 'KCSE D', '2 Years'),
      c('Certificate in Electrical & Electronics Engineering (Instrumentation & Control)', 'KCSE D', '2 Years'),
      c('Artisan Certificate in Electrical Installation', 'Open', '1 Year'),
    ],
  },
  {
    id: 'building',
    name: 'Building & Civil Engineering',
    short: 'Building & Civil',
    image: '/images/dept-building.png',
    head: 'Mr. Bernard Mganga',
    summary:
      'One of the largest departments in the Institute, with well-equipped workshops. Graduates work in construction, real estate, the Ministry of Works, KeNHA and the SGR project.',
    courses: [
      c('Diploma in Building & Construction Technology', 'KCSE C-', '3 Years'),
      c('Certificate in Building & Construction Engineering', 'KCSE D', '2 Years'),
      c('Artisan Certificate in Welding & Fabrication', 'Open', '1 Year'),
      c('Artisan Certificate in Masonry', 'Open', '1 Year'),
      c('Artisan Certificate in Plumbing', 'Open', '1 Year'),
      c('Artisan Certificate in Carpentry & Joinery', 'Open', '1 Year'),
      c('Artisan Certificate in Painting & Decorations', 'Open', '1 Year'),
    ],
  },
  {
    id: 'ict',
    name: 'Information & Communication Technology',
    short: 'ICT',
    image: '/images/dept-ict.png',
    head: 'Madam Phednike Mwambori',
    summary:
      'Provides holistic training in ICT & Computer Studies from a state-of-the-art computer lab, with campus-wide Wi-Fi, student and staff portals, and E-Learning.',
    courses: [
      c('Diploma in Information & Communication Technology (ICT)', 'KCSE C-', '3 Years'),
      c('Diploma in Computer Studies', 'KCSE C-', '3 Years'),
      c('Certificate in Computer Studies', 'KCSE D', '2 Years'),
      c('Certificate in Information & Communication Technology (ICT)', 'KCSE D', '2 Years'),
      c('Computer Packages', 'Open', '3 Months', 'GTTI'),
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    short: 'Hospitality',
    image: '/images/dept-hospitality.png',
    head: 'Department of Hospitality',
    summary:
      "Prepares trainees for Kenya's coastal hospitality and tourism industry through food & beverage production, tour guiding and travel operations programmes.",
    courses: [
      c('Diploma in Food & Beverage Production, Sales and Services', 'KCSE C-', '3 Years'),
      c('Diploma in Tourism Management', 'KCSE C-', '3 Years'),
      c('Certificate in Food & Beverage Production, Sales and Services', 'KCSE D', '2 Years'),
      c('Certificate in Tour Guiding & Travel Operations', 'KCSE D', '2 Years'),
      c('Artisan Certificate in Food & Beverage Production, Sales and Services', 'Open', '1 Year'),
    ],
  },
  {
    id: 'business',
    name: 'Business Studies',
    short: 'Business',
    image: '/images/dept-business.png',
    head: 'Miss Caroline Muthuani',
    summary:
      'Offers diploma and craft programmes in management, marketing, supply chain, human resources and social work for the growing private and public sector.',
    courses: [
      c('Diploma in Business Management', 'KCSE C-', '3 Years'),
      c('Diploma in Sales & Marketing', 'KCSE C-', '3 Years'),
      c('Diploma in Supply Chain Management', 'KCSE C-', '3 Years'),
      c('Diploma in Human Resource Management', 'KCSE C-', '3 Years'),
      c('Diploma in Social Work & Community Development', 'KCSE C-', '3 Years'),
      c('Craft Certificate in Business Management', 'KCSE D', '2 Years'),
      c('Craft Certificate in Sales & Marketing', 'KCSE D', '2 Years'),
      c('Craft Certificate in Supply Chain Management', 'KCSE D', '2 Years'),
      c('Craft Certificate in Human Resource Management', 'KCSE D', '2 Years'),
      c('Craft Certificate in Social Work & Community Development', 'KCSE D', '2 Years'),
    ],
  },
]

export const totalCourses = departments.reduce((sum, d) => sum + d.courses.length, 0)

export const leadership = [
  { name: 'Mrs. Christine Katana', role: 'Board Chair' },
  { name: 'Mrs. Hafsa Seif', role: 'Principal / Board Secretary' },
  { name: 'Mr. Festus Mugogo', role: 'Deputy Principal' },
  { name: 'Mr. Franco Mwangala', role: 'Dean of Students' },
]

export const partners = [
  { acronym: 'MoE', name: 'Ministry of Education — State Department for TVET' },
  { acronym: 'TVETA', name: 'Technical & Vocational Education and Training Authority' },
  { acronym: 'KNEC', name: 'Kenya National Examinations Council' },
  { acronym: 'HELB', name: 'Higher Education Loans Board' },
  { acronym: 'NITA', name: 'National Industrial Training Authority' },
  { acronym: 'KUCCPS', name: 'Kenya Universities & Colleges Central Placement Service' },
]
