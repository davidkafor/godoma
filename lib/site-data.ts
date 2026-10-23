export const contact = {
  phones: ['+254 743 661 423'],
  email: 'godomatti.gtti@gmail.com',
  address: 'Matanomanne Market, Vitengeni Road, Ganze Sub-county, Kilifi County, Kenya',
  postalAddress: 'P.O. Box 1808–80108, Kilifi',
  locationNote: '30 km from Kilifi town along Vitengeni Road, adjacent to Arabuko Sokoke Forest and next to Vitengeni Baptist Secondary School.',
  mapEmbed:
    'https://www.google.com/maps/search/?api=1&query=Godoma+Technical+Training+Institute%2C+Vitengeni%2C+Kilifi%2C+Kenya',
}

export const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/search/top?q=Godoma%20Technical%20Training%20Institute' },
  { name: 'X', href: 'https://x.com/GodomaTTI' },
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
          { label: 'Principal Office', href: '/principal-office' },
      { label: 'Deputy Principal Office', href: '/deputy-principal-office' },
  { label: 'Dean of Students', href: '/dean-of-students' },
  { label: 'Recognition of Prior Learning (RPL)', href: '/recognition-of-prior-learning' },
  { label: 'Industrial Liaison Office', href: '/industrial-liaison-office' },
  { label: 'IQA (Internal Quality Assurance Office)', href: '/iqa' },
  { label: 'Assessment Office', href: '/assessment-office' },
  ],
  },
  {
  label: 'Admissions',
    href: '/admissions',
  items: [
  { label: 'Entry Requirements', href: '/admissions#entry-requirements' },
  { label: 'Registrar Office', href: '/registrar-office' },
      { label: 'Student Funding', href: '/funding' },
          { label: 'Contact Admissions', href: '/contact' },
    ],
  },
  {
    label: 'Academics',
    href: '/departments',
    items: [
      { label: 'Electrical and Electronics Engineering', href: '/departments/electrical' },
      { label: 'Building and Civil Engineering', href: '/departments/building' },
  { label: 'Computing and Informatics', href: '/departments/ict' },
  { label: 'Tourism & Hospitality', href: '/departments/hospitality' },
  { label: 'Automotive and Mechanical Engineering', href: '/departments/mechanical' },
      { label: 'Fashion & Cosmetology', href: '/departments/fashion' },
      { label: 'Agricultural Studies', href: '/departments/agriculture' },
      { label: 'Business & Liberal Studies', href: '/departments/business' },
    ],
  },
  {
    label: 'Trainees',
    href: '/trainees',
  items: [
  { label: 'Students Downloads', href: '/trainees#downloads' },
  { label: 'Guidance and Counselling', href: '/guidance-counselling' },
  { label: 'Events Calendar', href: '/events' },
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
title: 'President Ruto Announces KSh 350 Million for Godoma TTI Expansion',
  date: 'October 2026',
  image: '/images/foundation-stone-laying.webp',
    excerpt:
      'Godoma TTI is set to benefit from a KSh 350 million investment, including new student hostels and expanded facilities, following the laying of the foundation stone during President William Ruto’s development tour of the Coast region.',
    href: '/notice-board#godoma-tti-expansion',
  },
  {
    title: 'HELB TVET Loans & Bursaries Now Available',
    date: 'Admissions',
    image: '/images/tvet-flier.webp',
    excerpt:
      'HELB finances TVET students in over 200 technical institutes. Get up to Kshs. 40,000 per year, upkeep money inclusive, for TVET CDACC programmes.',
    href: '/notice-board#helb-tvet-loans',
  },
  {
    title: 'Motivational Talk: The Bridge Between Goals and Accomplishment is Discipline',
    date: '18 March 2020',
    image: '/images/motivational-talk.webp',
    excerpt:
      'The Office of the Dean of Students invites all staff and students to a talk on Corona Virus, HIV/AIDS, drugs, mental health and discipline at GTTI Phase II.',
    href: '/notice-board#motivational-talk',
  },
  {
    title: 'Godoma TTI Service Charter',
    date: 'Notice Board',
    image: '/images/service-charter-en.webp',
    excerpt:
      'Read our service charter (English & Kiswahili) outlining the services we offer, our commitments, and the standards our customers can expect.',
    href: '/notice-board#service-charter',
  },
]

export const tickerItems = [
  'President Ruto announces KSh 350 million investment for Godoma TTI expansion',
  'Admissions ongoing for TVET CDACC Level 3, Level 4, Level 5 and Level 6 programmes',
  'Apply for HELB TVET loans & bursaries — up to Kshs. 40,000 per year',
  'Download your admission letter from the Students Downloads page',
  'Computer Packages short course — 3 months, open entry',
  'Plans underway to become a NITA Exam Centre',
  'Godoma TTI is earmarked to become the national Polytechnic for Kilifi County',
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

const c = (name: string, requirement: string, duration: string, examiner = 'TVET CDACC'): Course => ({
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
  image: '/images/dept-electrical.webp',
  head: 'Mia Mulinge Kevin',
    summary:
      'Established in 2016 to train manpower in both the Power and Instrumentation & Control options, with two equipped modern workshops — Electrical workshops and an Electronics laboratory.',
    courses: [
      c('Solar PV Installation (Level 4)', 'KCSE D', '6 Months', 'TVET CDACC'),
      c('Electronics Engineering (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Electronics Engineering (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Electrical Engineering (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Electrical Engineering (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Electrical Engineering (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Electrical Installation Technology (Level 4)', 'KCSE D', '6 Months', 'TVET CDACC'),
      c('Electrical Installation', 'Open', '6 Months', 'TVET CDACC'),
    ],
  },
  {
    id: 'building',
    name: 'Building & Civil Engineering',
    short: 'Building & Civil',
    image: '/images/dept-building.webp',
    head: 'Mr. Bernard Mganga',
    summary:
      'One of the largest departments in the Institute, with well-equipped workshops. Graduates work in construction, real estate, the Ministry of Works, KeNHA and the SGR project.',
    courses: [
      c('Land Survey (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
      c('Masonry (Level 4)', 'KCSE D', '6 Months', 'TVET CDACC'),
      c('Plumbing (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Plumbing (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Civil Engineering (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Civil Engineering (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
      c('Building Technology (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Building Technology (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
      c('Carpentry & Joinery (Level 4)', 'KCSE D', '6 Months', 'TVET CDACC'),
      c('Masonry', 'Open', '6 Months', 'TVET CDACC'),
      c('Plumbing and Pipe Fitting', 'Open', '6 Months', 'TVET CDACC'),
      c('Carpentry', 'Open', '6 Months', 'TVET CDACC'),
      c('Welding', 'Open', '6 Months', 'TVET CDACC'),
    ],
  },
  {
    id: 'ict',
name: 'Computing and Informatics',
  short: 'Computing and Informatics',
  image: '/images/dept-ict.webp',
  head: 'Priscillar Neema',
    summary:
      'Provides practical, industry-focused training in computing, software, cybersecurity, digital applications, and informatics through modern computer-based learning.',
    courses: [
      c('Computing and Informatics (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Computing and Informatics (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Computing and Informatics (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Cyber Security (Level 4)', 'KCSE D', '6 Months', 'TVET CDACC'),
      c('Computer Science (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
      c('Computer Packages', 'Open', '3 Months', 'GTTI'),
    ],
  },
  {
    id: 'hospitality',
    name: 'Tourism & Hospitality',
    short: 'Hospitality',
  image: '/images/dept-hospitality.webp',
  head: 'Imelda Nyoka',
    summary:
      "Prepares trainees for Kenya's coastal hospitality and tourism industry through food & beverage production, tour guiding and travel operations programmes.",
    courses: [
      c('Catering & Accommodation (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Catering & Accommodation (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Tourism & Travel Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Tourism & Travel Management (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
      c('Food & Beverages — Culinary Arts (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Food & Beverages — Culinary Arts (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Food & Beverages — Culinary Arts (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('House Keeping & Accommodation (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('House Keeping & Accommodation (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Food and Beverage Production', 'Open', '6 Months', 'TVET CDACC'),
    ],
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    short: 'Mechanical',
image: '/images/dept-mechanical.jpg',
  head: 'Conrad Ibala',
    summary: 'Practical training for the automotive and fabrication industries through competency-based programmes.',
    courses: [
      c('Automotive Technology (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Automotive Technology (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Welding & Fabrication (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Welding & Fabrication (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Motorcycle', 'Open', '6 Months', 'TVET CDACC'),
      c('Motor Vehicle Mechanics', 'Open', '6 Months', 'TVET CDACC'),
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion & Cosmetology',
    short: 'Fashion',
  image: '/images/dept-fashion-cosmetology.webp',
  head: 'Department of Fashion & Cosmetology',
    summary: 'Creative and practical training in fashion design, hairdressing and beauty therapy.',
    courses: [
      c('Fashion & Design (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Fashion & Design (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Cosmetology (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Cosmetology (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Hairdressing', 'Open', '6 Months', 'TVET CDACC'),
      c('Beauty Therapy', 'Open', '6 Months', 'TVET CDACC'),
      c('Dress Making', 'Open', '6 Months', 'TVET CDACC'),
    ],
  },
  {
    id: 'agriculture',
    name: 'Agricultural Studies',
    short: 'Agriculture',
  image: '/images/dept-agriculture.webp',
  head: 'Emmanuel Kipkorir',
  summary: 'Entrepreneurial agricultural training that equips trainees with practical skills for sustainable farming and economic development.',
    courses: [
      c('Agri-preneurship (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
  c('Agri-preneurship (Level 4)', 'KCSE', '1 Year', 'TVET CDACC'),
      c('Agri-preneurship', 'Open', '6 Months', 'TVET CDACC'),
    ],
  },
  {
    id: 'business',
    name: 'Business & Liberal Studies',
    short: 'Business',
    image: '/images/dept-business.webp',
    head: 'Leonard Nyamawi',
    summary:
      'Offers diploma and craft programmes in management, marketing, supply chain, human resources and social work for the growing private and public sector.',
    courses: [
      c('Supply Chain Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Supply Chain Management (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
      c('Human Resource Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Human Resource Management (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
      c('Business Management (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Business Management (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
      c('Social Work & Community Development (Level 6)', 'KCSE C-', '3 Years', 'TVET CDACC'),
  c('Social Work & Community Development (Level 5)', 'KCSE D', '2 Years', 'TVET CDACC'),
    ],
  },
]

export const totalCourses = departments.reduce((sum, d) => sum + d.courses.length, 0)

export const leadership = [
  { name: 'Mrs. Christine Katana', role: 'Board Chair' },
  { name: 'Mrs. Hafsa Seif', role: 'Principal / Board Secretary' },
  { name: 'Festus Mugogo', role: 'Deputy Principal — Administration' },
  { name: 'Franco Mwadzo Mwangala', role: 'Deputy Principal — Academics / Training' },
]

export const partners = [
  { acronym: 'TVETA', name: 'Technical & Vocational Education and Training Authority', logo: '/images/partners/tveta.webp' },
  { acronym: 'KNEC', name: 'Kenya National Examinations Council', logo: '/images/partners/knec.jpeg' },
  { acronym: 'HELB', name: 'Higher Education Loans Board', logo: '/images/partners/helb.webp' },
  { acronym: 'NITA', name: 'National Industrial Training Authority', logo: '/images/partners/nita.webp' },
  { acronym: 'KUCCPS', name: 'Kenya Universities & Colleges Central Placement Service', logo: '/images/partners/kuccps.webp' },
  ]
