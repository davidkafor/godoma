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
      { label: 'Brief History', href: '/about/history' },
      { label: 'Governance', href: '/about/governance' },
      { label: 'Administration', href: '/about/administration' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    items: [
      { label: 'Entry Requirements', href: '/admissions' },
      { label: 'HELB TVET Loans', href: '/admissions/helb-loans' },
      { label: 'Accommodation', href: '/admissions/accommodation' },
      { label: 'Contact Admissions', href: '/admissions/contact' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    items: [
      { label: 'Electrical & Electronics', href: '/academics/electrical' },
      { label: 'Building & Civil', href: '/academics/building' },
      { label: 'ICT', href: '/academics/ict' },
      { label: 'Hospitality & Tourism', href: '/academics/hospitality' },
      { label: 'Business', href: '/academics/business' },
    ],
  },
  {
    label: 'Trainees',
    href: '/trainees',
    items: [
      { label: 'Students Portal', href: '/trainees/portal' },
      { label: 'E-Learning', href: '/trainees/e-learning' },
      { label: 'Students Downloads', href: '/trainees/downloads' },
      { label: 'Aids Control Unit', href: '/trainees/aids-control-unit' },
      { label: 'Events Calendar', href: '/trainees/events' },
    ],
  },
  { label: 'Library', href: '/library' },
  { label: 'Contact Us', href: '/contact' },
]

export const boardMembers = [
  { name: 'Mrs. Christine Katana', role: 'Board Chair' },
  { name: 'Mrs. Hafsa Seif', role: 'Principal / Board Secretary' },
  { name: 'Mr. Mohammed Omar', role: 'Board Deputy Chair' },
  { name: 'Mr. Charles Ndegwa', role: 'TVET Director / Board Member' },
  { name: 'Mrs. Saadu Hashim', role: 'Board Member' },
  { name: 'Mr. Shumaa Mwangome', role: 'Board Member' },
  { name: 'Dr. Khalander Khan', role: 'Board Member' },
  { name: 'Mr. Peter Okwaro', role: 'Board Member' },
  { name: 'Prof. Gabriel Katana', role: 'Board Member' },
]

export const managementTeam = [
  { name: 'Mrs. Hafsa Seif', role: 'Principal' },
  { name: 'Mr. Festus Mugogo', role: 'Deputy Principal / PC Co-ordinator' },
  { name: 'Mr. Franco Mwangala', role: 'Dean of Students' },
  { name: 'Miss Phednike Mwambori', role: 'Academic Registrar / HOD ICT' },
  { name: 'Mr. John Baraka', role: 'Head of Finance' },
  { name: 'Miss Caroline Muthuani', role: 'HOD Business / Exams' },
  { name: 'Mr. Leornard Nyamawi', role: 'Head of Procurement' },
  { name: 'Mr. Bernard Mganga', role: 'HOD Building Department' },
  { name: 'Mr. Amos Chirchir', role: 'HOD Electrical Department' },
  { name: 'Mr. Chigamba Beja', role: 'Integrity Officer' },
]

export const departmentDetails: Record<
  string,
  { intro: string; objectives?: string[]; staff?: { name: string; section: string; designation: string }[] }
> = {
  electrical: {
    intro:
      'Innovation is one way to make the world a better place, and even the smallest innovation can improve life in many ways. Our business is to train the innovators. The department develops competent Electrical & Electronics Engineering graduates who are locally and internationally recognised, in line with Kenya Vision 2030. It has two main sections — Power, and Instrumentation & Control — with two equipped modern workshops. Plans are underway to become a NITA Exam Centre.',
    objectives: [
      'Promote high standards in training, teaching, research and scholarship.',
      'Provide manpower for Kenya and other countries through technical education in Electrical & Electronics.',
      'Produce engineers who are professionally recognised in their areas of specialisation.',
    ],
    staff: [
      { name: 'Mr. Amos Chirchir', section: 'Electronics', designation: 'HOD / Trainer' },
      { name: 'Mr. Franco Mwangala', section: 'Instrumentation & Control', designation: 'Dean of Students / Trainer' },
      { name: 'Mr. Chigamba Beja', section: 'Electronics', designation: 'Trainer' },
      { name: 'Mr. Rogders Sanga', section: 'Power', designation: 'Trainer' },
      { name: 'Madam Harriet Mosomi', section: 'Power', designation: 'Trainer' },
      { name: 'Mr. Abimaitha Maitha', section: 'Power', designation: 'Trainer' },
      { name: 'Mr. Fred', section: 'Electrical', designation: 'Technician' },
    ],
  },
  building: {
    intro:
      'Our primary strength lies in our students, faculty and staff. The diploma programmes continue to attract many suitable candidates, making this one of the largest departments in the Institute. Courses and teaching methods are continuously revised to meet the needs of the developing economy. Graduates are employed by real estate developers, construction companies, the Ministry of Works, KeNHA and the Standard Gauge Railway project, or further their studies in higher institutions.',
    staff: [
      { name: 'Mr. Bernard Mganga', section: 'Building', designation: 'HOD / Trainer' },
      { name: 'Mr. Phanuel Menza', section: 'Building', designation: 'Trainer' },
    ],
  },
  ict: {
    intro:
      'The department provides quality holistic training in ICT & Computer Studies, develops the Institution’s ICT infrastructure, and offers essential ICT training and technical support to all departments. A state-of-the-art computer lab and campus-wide wireless internet support learning, while students access results and fee statements on the student portal and the recently introduced E-Learning platform.',
    objectives: [
      'To be ICT compliant.',
      'To equip staff and students with the necessary ICT skills.',
      'To offer learning opportunities through Open and Distance Learning.',
      'To develop ICT instructional materials.',
    ],
    staff: [
      { name: 'Madam Phednike Mwambori', section: 'ICT', designation: 'HOD / Registrar' },
      { name: 'Mr. Festus Mugogo', section: 'ICT', designation: 'Deputy Principal / Trainer' },
      { name: 'Madam Prinscillah Neema', section: 'ICT', designation: 'Trainer' },
      { name: 'Mr. Hassan', section: 'ICT', designation: 'Technician' },
    ],
  },
  hospitality: {
    intro:
      'Located on Kenya’s coast, Godoma TTI prepares trainees for the hotel, restaurant and tourism industry. Programmes combine kitchen and service practicals with tour guiding and travel operations, examined by KNEC at Diploma, Certificate and Artisan levels.',
  },
  business: {
    intro:
      'The Business department offers Diploma and Craft Certificate programmes in Business Management, Sales & Marketing, Supply Chain, Human Resource Management and Social Work & Community Development — equipping trainees for the private sector, public service and self-employment.',
  },
}

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
    href: 'https://www.helb.co.ke',
  },
  {
    title: 'Motivational Talk: The Bridge Between Goals and Accomplishment is Discipline',
    date: '18 March 2020',
    image: '/images/motivational-talk.jpg',
    excerpt:
      'The Office of the Dean of Students invites all staff and students to a talk on Corona Virus, HIV/AIDS, drugs, mental health and discipline at GTTI Phase II.',
    href: `${OFFICIAL_SITE}/news.html`,
  },
  {
    title: 'Godoma TTI Service Charter',
    date: 'Notice Board',
    image: '/images/service-charter-en.jpg',
    excerpt:
      'Read our service charter (English & Kiswahili) outlining the services we offer, our commitments, and the standards our customers can expect.',
    href: `${OFFICIAL_SITE}/news.html`,
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
