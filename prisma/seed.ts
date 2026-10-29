import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { prisma } from '../lib/prisma'
import {
  contact,
  socials,
  heroSlides,
  news,
  tickerItems,
  instituteProfile,
  coreValues,
  mandate,
  departments,
  leadership,
  partners,
} from '../lib/site-data'
import { seedPages, seedBoardMembers } from '../lib/seed/pages'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// Every seeded row has a stable key, and `update: {}` means re-running never overwrites
// content an administrator has edited and never creates duplicates.

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)

const minutesAgo = (n: number) => new Date(Date.now() - n * 60_000)

const facilitySeed = [
  { icon: 'Wrench', title: 'Modern Workshops', text: 'The 26-acre institute has two electrical engineering workshops, four building technology labs and four fully equipped building technology workshops.' },
  { icon: 'Cpu', title: 'State-of-the-art ICT Lab', text: 'A well-equipped computer lab supporting ICT training for trainees and staff across all departments.' },
  { icon: 'Wifi', title: 'Campus-wide Internet', text: 'Strategically located wireless access points, plus online student portal, results, fee statements and E-Learning.' },
  { icon: 'BedDouble', title: 'Accommodation', text: 'A serene, welcoming learning environment in Vitengeni, bordering the famous Dida forest.' },
  { icon: 'HeartPulse', title: 'Student Welfare', text: 'The Dean of Students office, Aids Control Unit, sports & games and guidance programmes support every trainee.' },
]

const testimonialSeed = [
  { quote: 'The electrical workshops gave me real practice, not just theory. By the time I completed my TVET CDACC assessment, I had already wired installations on my own.', name: 'Alumnus', role: 'TVET CDACC Electrical & Electronics — Level 6' },
  { quote: 'The ICT lab and campus Wi-Fi meant I could practice any time. The trainers are patient and always ready to help with projects.', name: 'Trainee', role: 'TVET CDACC Information & Communication Technology — Level 6' },
  { quote: 'Through the HELB TVET loan I was able to focus on my studies. Godoma TTI prepared me for work in the coastal hospitality industry.', name: 'Alumna', role: 'TVET CDACC Food & Beverage Production — Level 4' },
  { quote: 'As a student leader I saw how the Dean of Students office supports trainees — from motivational talks to mentorship and welfare.', name: 'Student Leader', role: 'TVET CDACC Business Management — Level 6' },
]

const downloadSeed: Array<[string, string, string]> = [
  ['Admission joining instructions', 'admission-joining-instructions.pdf', 'Admissions'],
  ['Application form', 'application-form.pdf', 'Admissions'],
  ['Course acceptance form', 'course-acceptance-form.pdf', 'Admissions'],
  ['Student personal details form', 'student-personal-details-form.pdf', 'Admissions'],
  ['Rules and regulations declaration form', 'rules-regulation-declaration-form.pdf', 'Trainees'],
  ['Hostel rules and regulations declaration form', 'hostel-rules-regulation-declaration-form.pdf', 'Trainees'],
  ['Deferment form', 'deferment-form.pdf', 'Trainees'],
  ['Attachment assessment form', 'attachment-assessment-form.pdf', 'Trainees'],
  ['Attachment logbook', 'attachment-logbook.pdf', 'Trainees'],
  ['Godoma TTI brochure', 'godoma-tti-brochure.pdf', 'General'],
  ['KUCCPS students fee structure', 'fee-structure.pdf', 'Fees'],
]

async function main() {
  const settings: Record<string, unknown> = {
    contact,
    socials,
    institute: instituteProfile,
    coreValues,
    mandate,
    ticker: tickerItems,
  }
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value: JSON.parse(JSON.stringify(value)) },
    })
  }

  for (const [i, s] of heroSlides.entries()) {
    await prisma.heroSlide.upsert({
      where: { seedKey: `hero-${i + 1}` },
      update: {},
      create: { seedKey: `hero-${i + 1}`, ...s, status: 'PUBLISHED', publishedAt: new Date(), sortOrder: i },
    })
  }

  for (const [i, n] of news.entries()) {
    await prisma.post.upsert({
      where: { seedKey: `news-${i + 1}` },
      update: {},
      create: {
        seedKey: `news-${i + 1}`,
        type: 'NEWS',
        slug: slugify(n.title),
        title: n.title,
        dateLabel: n.date,
        excerpt: n.excerpt,
        image: n.image,
        href: n.href,
        status: 'PUBLISHED',
        publishedAt: minutesAgo(i),
        sortOrder: i,
      },
    })
  }

  for (const [i, d] of departments.entries()) {
    const dept = await prisma.department.upsert({
      where: { slug: d.id },
      update: {},
      create: {
        slug: d.id,
        name: d.name,
        shortName: d.short,
        image: d.image,
        head: d.head,
        summary: d.summary,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        sortOrder: i,
      },
    })
    for (const [j, c] of d.courses.entries()) {
      await prisma.course.upsert({
        where: { departmentId_name: { departmentId: dept.id, name: c.name } },
        update: { requirement: c.requirement, duration: c.duration, examiner: c.examiner, sortOrder: j },
        create: { departmentId: dept.id, ...c, status: 'PUBLISHED', publishedAt: new Date(), sortOrder: j },
      })
    }
  }

  for (const [slug, p] of Object.entries(seedPages)) {
    await prisma.contentPage.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: p.title,
        eyebrow: p.eyebrow,
        intro: p.intro,
        sections: JSON.parse(JSON.stringify(p.sections)),
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    })
  }

  for (const [i, m] of seedBoardMembers.entries()) {
    await prisma.staffProfile.upsert({
      where: { seedKey: `board-${i + 1}` },
      update: {},
      create: {
        seedKey: `board-${i + 1}`,
        group: 'BOARD',
        name: m.name,
        role: m.role,
        bio: m.bio,
        photo: m.photo,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        sortOrder: i,
      },
    })
  }
  for (const [i, m] of leadership.entries()) {
    await prisma.staffProfile.upsert({
      where: { seedKey: `leadership-${i + 1}` },
      update: {},
      create: {
        seedKey: `leadership-${i + 1}`,
        group: 'MANAGEMENT',
        name: m.name,
        role: m.role,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        sortOrder: i,
      },
    })
  }

  for (const [i, f] of facilitySeed.entries()) {
    await prisma.facility.upsert({
      where: { seedKey: `facility-${i + 1}` },
      update: {},
      create: { seedKey: `facility-${i + 1}`, ...f, status: 'PUBLISHED', publishedAt: new Date(), sortOrder: i },
    })
  }

  for (const [i, t] of testimonialSeed.entries()) {
    await prisma.testimonial.upsert({
      where: { seedKey: `testimonial-${i + 1}` },
      update: {},
      create: { seedKey: `testimonial-${i + 1}`, ...t, status: 'PUBLISHED', publishedAt: new Date(), sortOrder: i },
    })
  }

  for (const [i, p] of partners.entries()) {
    await prisma.partner.upsert({
      where: { acronym: p.acronym },
      update: {},
      create: { ...p, status: 'PUBLISHED', publishedAt: new Date(), sortOrder: i },
    })
  }

  for (const [i, [title, file, category]] of downloadSeed.entries()) {
    await prisma.download.upsert({
      where: { seedKey: file },
      update: {},
      create: {
        seedKey: file,
        title,
        category,
        file: `/downloads/${file}`,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        sortOrder: i,
      },
    })
  }

  const counts = {
    pages: await prisma.contentPage.count(),
    departments: await prisma.department.count(),
    courses: await prisma.course.count(),
    posts: await prisma.post.count(),
    staff: await prisma.staffProfile.count(),
    downloads: await prisma.download.count(),
  }
  console.log('Seed complete:', counts)
  // Sanity check that the downloads we reference still exist on disk.
  for (const [, file] of downloadSeed) {
    if (!fs.existsSync(path.join(process.cwd(), 'public', 'downloads', file))) console.warn(`Missing file: public/downloads/${file}`)
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
