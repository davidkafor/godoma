export const contact = {
  phones: ['+254 743 661 423'],
  email: 'godomatti.gtti@gmail.com',
  address: 'Matanomanne Market, Vitengeni Road, Ganze Sub-county, Kilifi County, Kenya',
  postalAddress: 'P.O. Box 1808–80108, Kilifi',
  locationNote: '30 km from Kilifi town along Vitengeni Road, adjacent to Arabuko Sokoke Forest and next to Vitengeni Baptist Secondary School.',
  mapEmbed:
    'https://www.google.com/maps?q=Godoma+Technical+Training+Institute,+Vitengeni,+Kilifi&output=embed',
}

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
      { label: 'Tourism & Hospitality', href: '/departments/hospitality' },
      { label: 'Mechanical Engineering', href: '/departments/mechanical' },
      { label: 'Fashion & Cosmetology', href: '/departments/fashion' },
      { label: 'Agriculture', href: '/departments/agriculture' },
      { label: 'Business & Liberal Studies', href: '/departments/business' },
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
  { label: 'Downloads', href: '/downloads' },
  { label: 'Contact Us', href: '/contact' },
]

export const heroSlides = [
  {
image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_0613.JPG-OsK9A7PdgKL3JPkDBT1fLsLbtUViNY.jpeg',
  alt: 'Godoma Technical Training Institute main building and entrance',
    eyebrow: 'Welcome to Godoma TTI',
    title: 'A Centre of Excellence in Technical Training',
    text: 'The first public sub-county technical training institute in Kilifi County, producing quality technical and entrepreneurial skills since 2016.',
  },
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_1569.JPG-YxH4RpTX6K9eatec8DIZbaWzMmmqxw.jpeg',
    alt: 'Godoma TTI football team pictured with the Principal outside the institute entrance',
    eyebrow: 'Sports & Student Life',
    title: 'Godoma TTI Football Team with the Principal',
    text: 'Our football team celebrates teamwork, discipline and school spirit alongside the Principal at Godoma Technical Training Institute.',
  },
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_0615.JPG-mjBl21SjEsybAzy2qy2NveYGm08xne.jpeg',
    alt: 'Godoma TTI campus courtyard with landscaped grounds and mature trees',
    eyebrow: 'A Conducive Campus Environment',
    title: 'Study, Learn and Stay Inspired.',
    text: 'Enjoy a peaceful and welcoming campus with landscaped grounds, open spaces and a supportive environment for study, growth and residence.',
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

export const instituteProfile = {
  motto: 'Quality learning for academic and technological excellence.',
  vision: 'A centre of excellence in technological training.',
  mission: 'To become a world class TVET institution in training for economic development.',
  intake: 'January, May and September',
  landSize: '26 acres',
  accommodation: 'Modern leased hostels for male and female trainees on a first-come, first-served basis.',
  activities: 'Sports and games, drama, music, and participation in TVET fairs and shows.',
  affirmativeAction: 'We encourage female trainees to undertake Science, Engineering and Technical (SET) courses.',
  fee: 'KSh 22,396 tuition fee',
}

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
    head: 'Mia Mulinge Kelvin',
    summary:
      'Established in 2016 to train manpower in both the Power and Instrumentation & Control options, with two equipped modern workshops — Electrical workshops and an Electronics laboratory.',
    courses: [
      c('Solar PV Installation (Level 4)', 'KCSE D', '6 Months', 'CDACC'),
      c('Electronics Engineering (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Electrical Engineering (Level 6, 5 & 4)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Electrical Installation Technology (Level 4)', 'KCSE D', '6 Months', 'CDACC'),
      c('Electrical Installation', 'Open', '6 Months', 'CDACC / NITA'),
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
      c('Land Survey (Level 5)', 'KCSE D', '2 Years', 'CDACC'),
      c('Masonry (Level 4)', 'KCSE D', '6 Months', 'CDACC'),
      c('Plumbing (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Civil Engineering (Level 6 & 5)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Building Technology (Level 6 & 5)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Carpentry & Joinery (Level 4)', 'KCSE D', '6 Months', 'CDACC'),
      c('Masonry', 'Open', '6 Months', 'CDACC / NITA'),
      c('Plumbing and Pipe Fitting', 'Open', '6 Months', 'CDACC / NITA'),
      c('Carpentry', 'Open', '6 Months', 'CDACC / NITA'),
      c('Welding', 'Open', '6 Months', 'CDACC / NITA'),
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
      c('ICT (Level 6, 5 & 4)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Cyber Security (Level 4)', 'KCSE D', '6 Months', 'CDACC'),
      c('Computer Science (Level 6)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Computer Packages', 'Open', '3 Months', 'GTTI'),
    ],
  },
  {
    id: 'hospitality',
    name: 'Tourism & Hospitality',
    short: 'Hospitality',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_1710.JPG-I03Bj24bYd1hKe8qBaUxQDgRSFCwk4.jpeg',
    head: 'Department of Hospitality',
    summary:
      "Prepares trainees for Kenya's coastal hospitality and tourism industry through food & beverage production, tour guiding and travel operations programmes.",
    courses: [
      c('Catering & Accommodation (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Tourism & Travel Management (Level 6 & 5)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Food & Beverages — Culinary Arts (Level 6, 5 & 4)', 'KCSE C-', '3 Years', 'CDACC'),
      c('House Keeping & Accommodation (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Food and Beverage Production', 'Open', '6 Months', 'CDACC / NITA'),
    ],
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    short: 'Mechanical',
    image: '/images/dept-building.png',
    head: 'Department of Mechanical Engineering',
    summary: 'Practical training for the automotive and fabrication industries through competency-based programmes.',
    courses: [
      c('Automotive Technology (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Welding & Fabrication (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Motorcycle', 'Open', '6 Months', 'CDACC / NITA'),
      c('Motor Vehicle Mechanics', 'Open', '6 Months', 'CDACC / NITA'),
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion & Cosmetology',
    short: 'Fashion',
    image: '/images/dept-hospitality.png',
    head: 'Department of Fashion & Cosmetology',
    summary: 'Creative and practical training in fashion design, hairdressing and beauty therapy.',
    courses: [
      c('Fashion & Design (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Cosmetology (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Hairdressing', 'Open', '6 Months', 'CDACC / NITA'),
      c('Beauty Therapy', 'Open', '6 Months', 'CDACC / NITA'),
      c('Dress Making', 'Open', '6 Months', 'CDACC / NITA'),
    ],
  },
  {
    id: 'agriculture',
    name: 'Agricultural Studies',
    short: 'Agriculture',
    image: '/images/dept-building.png',
    head: 'Agricultural Department',
    summary: 'Entrepreneurial agricultural training that equips trainees with practical skills for economic development.',
    courses: [
      c('Agri-preneurship (Level 5 & 4)', 'KCSE D', '2 Years', 'CDACC'),
      c('Agri-preneurship', 'Open', '6 Months', 'CDACC / NITA'),
    ],
  },
  {
    id: 'business',
    name: 'Business & Liberal Studies',
    short: 'Business',
    image: '/images/dept-business.png',
    head: 'Miss Caroline Muthuani',
    summary:
      'Offers diploma and craft programmes in management, marketing, supply chain, human resources and social work for the growing private and public sector.',
    courses: [
      c('Supply Chain Management (Level 6 & 5)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Human Resource Management (Level 6 & 5)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Business Management (Level 6 & 5)', 'KCSE C-', '3 Years', 'CDACC'),
      c('Social Work & Community Development (Level 6 & 5)', 'KCSE C-', '3 Years', 'CDACC'),
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
