import type { Metadata } from 'next'
import Image from 'next/image'
import { Download, Globe, Mail, MapPin } from 'lucide-react'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { TopBar } from '@/components/site/top-bar'

export const metadata: Metadata = {
  title: 'Service Delivery Charter | Godoma Technical Training Institute',
  description:
    'The Godoma Technical Training Institute Service Delivery Charter (Mkataba wa Utoaji Huduma): services rendered, customer expectations, our expectations and timelines for service delivery.',
}

type Row = { service: string; customer: string; ours: string; time: string }

type CharterLanguage = {
  id: string
  lang: string
  title: string
  columns: { sn: string; service: string; customer: string; ours: string; time: string }
  rows: Row[]
  footnote: string
}

const tagline = 'Quality Learning for Academic and Technological Excellence'
const address = 'P.O. Box 1808-80108, Kilifi, Kenya'
const email = 'godomatti.gtti@gmail.com'
const website = 'www.godomatti.ac.ke'

const english: CharterLanguage = {
  id: 'english',
  lang: 'en',
  title: 'Service Delivery Charter',
  columns: {
    sn: 'SN',
    service: 'Service Rendered',
    customer: 'Expectations of the Customers',
    ours: 'Our Expectations from Customers',
    time: 'Timely Frame of Service Delivery',
  },
  rows: [
    { service: 'Response to Phone Calls', customer: 'Prompt response', ours: 'Use official communication channels respectfully', time: 'Within 15 seconds' },
    { service: 'Walk-in Client Enquiries', customer: 'Quick assistance and guidance', ours: 'Make clear enquiries and observe office procedures', time: 'Within 1 minute' },
    { service: 'Response to Correspondence', customer: 'Timely response to correspondence', ours: 'Provide clear and accurate correspondence details', time: 'Letters: 5 working days. Email/Social Media: 1 working day' },
    { service: 'Registration of Trainees', customer: 'Quick processing of registration', ours: 'Submit genuine bank deposit slips, offer letter, copy of national ID, KCSE result slip, birth certificate, and two passport photos', time: 'Week of term commencement' },
    { service: 'Lectures and Training', customer: 'Quality teaching and learning', ours: 'Adhere to approved timetables and attend classes regularly', time: 'As per approved timetable' },
    { service: 'Accommodation Services', customer: 'Good accommodation facilities', ours: 'Pay accommodation fees and comply with hostel regulations', time: 'Throughout session dates' },
    { service: 'Examinations', customer: 'Fair administration of examinations', ours: 'Observe examination rules and regulations', time: 'Week of term commencement' },
    { service: 'Security Services', customer: 'Safe environment', ours: 'Cooperate with security personnel and provide relevant information', time: 'Throughout' },
    { service: 'Disciplinary Cases', customer: 'Fairness in disciplinary process', ours: 'Provide truthful and accurate information', time: 'Within 1 week' },
    { service: 'Resolution of Complaints', customer: 'Prompt complaint resolution', ours: 'Provide accurate and sincere information regarding complaints', time: 'Maximum of 14 working days' },
    { service: 'Tender Prequalification and Tendering', customer: 'Fair evaluation and award', ours: 'Submit completed tender/prequalification documents and meet bidding requirements', time: 'As per tender procedures' },
    { service: 'Processing of Tenders', customer: 'Transparent tender processing', ours: 'Submit bids for goods and services within timelines', time: 'Within 90 days' },
    { service: 'Payment for Goods and Services', customer: 'Timely payment for services rendered', ours: 'Submit LPO, invoice, certificate of completion, and supporting documents', time: 'Within 30–60 days after receipt of invoice' },
    { service: 'Disposal of Obsolete Stores', customer: 'Fair disposal process', ours: 'Submit disposal bid documents as required', time: 'Within 60 days from advertisement' },
    { service: 'Processing Requests for Information', customer: 'Timely access to information', ours: 'Submit formal requests for information', time: 'Within 21 days' },
  ],
  footnote: 'Not satisfied with our services? Please let us know. Contact us for any enquiries.',
}

const kiswahili: CharterLanguage = {
  id: 'kiswahili',
  lang: 'sw',
  title: 'Mkataba wa Utuoji Huduma',
  columns: {
    sn: 'SN',
    service: 'Huduma',
    customer: 'Matarajio ya Wateja',
    ours: 'Matarajio Yetu kwa Wateja',
    time: 'Muda wa Utoaji Huduma',
  },
  rows: [
    { service: 'Kujibu Simu', customer: 'Majibu ya haraka', ours: 'Kutumia njia rasmi za mawasiliano kwa heshima', time: 'Ndani ya sekunde 15' },
    { service: 'Maswali ya Wateja Wanaofika Ofisini', customer: 'Msaada na mwongozo wa haraka', ours: 'Kutoa maswali kwa uwazi na kufuata taratibu za ofisi', time: 'Ndani ya dakika 1' },
    { service: 'Kujibu Mawasiliano', customer: 'Majibu ya wakati kwa mawasiliano', ours: 'Kutoa taarifa sahihi na wazi katika mawasiliano', time: 'Barua: siku 5 za kazi. Barua pepe/Mitandao ya kijamii: siku 1 ya kazi' },
    { service: 'Usajili wa Wanafunzi', customer: 'Kushughulikia usajili kwa haraka', ours: 'Kuwasilisha stakabadhi halali za benki, barua ya udahili, nakala ya kitambulisho cha taifa, cheti cha KCSE, cheti cha kuzaliwa, na picha mbili za pasipoti', time: 'Wiki ya kuanza muhula' },
    { service: 'Mihadhara na Mafunzo', customer: 'Ufundishaji na ujifunzaji bora', ours: 'Kufuatilia ratiba zilizoidhinishwa na kuhudhuria madarasa mara kwa mara', time: 'Kulingana na ratiba iliyoidhinishwa' },
    { service: 'Huduma za Malazi', customer: 'Malazi bora', ours: 'Kulipa ada za malazi na kufuata kanuni za hosteli', time: 'Katika kipindi chote cha muhula' },
    { service: 'Mitihani', customer: 'Usimamizi wa haki wa mitihani', ours: 'Kuzingatia sheria na kanuni za mitihani', time: 'Wiki ya kuanza muhula' },
    { service: 'Huduma za Usalama', customer: 'Mazingira salama', ours: 'Kushirikiana na maafisa wa usalama na kutoa taarifa muhimu', time: 'Wakati wote' },
    { service: 'Kesi za Nidhamu', customer: 'Haki katika mchakato wa nidhamu', ours: 'Kutoa taarifa za ukweli na sahihi', time: 'Ndani ya wiki 1' },
    { service: 'Utatuzi wa Malalamiko', customer: 'Utatuzi wa haraka wa malalamiko', ours: 'Kutoa taarifa sahihi na za ukweli kuhusu malalamiko', time: 'Kiwango cha juu siku 14 za kazi' },
    { service: 'Uhakiki wa Zabuni na Zabuni', customer: 'Tathmini na utoaji wa haki', ours: 'Kuwasilisha nyaraka kamili za zabuni/uhakiki na kutimiza masharti ya zabuni', time: 'Kulingana na taratibu za zabuni' },
    { service: 'Uchakataji wa Zabuni', customer: 'Uchakataji wa wazi wa zabuni', ours: 'Kuwasilisha zabuni za bidhaa na huduma ndani ya muda uliowekwa', time: 'Ndani ya siku 90' },
    { service: 'Malipo ya Bidhaa na Huduma', customer: 'Malipo kwa wakati kwa huduma zilizotolewa', ours: 'Kuwasilisha LPO, ankara, cheti cha kukamilisha kazi, na nyaraka zinazohitajika', time: 'Ndani ya siku 30–60 baada ya kupokea ankara' },
    { service: 'Uondoaji wa Mali Chakavu', customer: 'Mchakato wa haki wa uondoaji', ours: 'Kuwasilisha nyaraka za zabuni ya uondoaji kama inavyohitajika', time: 'Ndani ya siku 60 tangu tangazo' },
    { service: 'Kushughulikia Maombi ya Taarifa', customer: 'Upatikanaji wa taarifa kwa wakati', ours: 'Kuwasilisha maombi rasmi ya taarifa', time: 'Ndani ya siku 21' },
  ],
  footnote: 'Je, hujaridhika na huduma yetu? Tafadhali tujulishe. Wasiliana nasi kupitia.',
}

function CharterTable({ data }: { data: CharterLanguage }) {
  const { columns, rows } = data
  return (
    <section id={data.id} lang={data.lang} aria-labelledby={`${data.id}-heading`} className="scroll-mt-24">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 bg-[#fff4d7] px-3 py-4 sm:gap-6 sm:px-8 sm:py-6">
          <Image
            src="/images/charter/coat-of-arms.png"
            alt="Coat of arms of the Republic of Kenya"
            width={435}
            height={428}
            className="h-14 w-auto shrink-0 sm:h-24 lg:h-32"
          />
          <p className="text-balance text-center text-xl font-black uppercase leading-[1.05] tracking-tight text-[#2d358f] sm:text-4xl lg:text-6xl">
            Godoma Technical
            <br />
            Training Institute
          </p>
          <Image
            src="/images/charter/gtti-logo.png"
            alt="Godoma Technical Training Institute logo"
            width={578}
            height={480}
            className="h-14 w-auto shrink-0 sm:h-24 lg:h-32"
          />
        </div>
        <div className="bg-[#2a2e7d] px-5 py-2 text-center text-white sm:py-3">
          <h2 id={`${data.id}-heading`} className="text-balance text-lg font-extrabold uppercase sm:text-3xl">
            {data.title}
          </h2>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#2a2e7d] text-xs font-bold uppercase tracking-wide text-white">
                <th scope="col" className="w-14 px-4 py-3">{columns.sn}</th>
                <th scope="col" className="px-4 py-3">{columns.service}</th>
                <th scope="col" className="px-4 py-3">{columns.customer}</th>
                <th scope="col" className="px-4 py-3">{columns.ours}</th>
                <th scope="col" className="px-4 py-3">{columns.time}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.service} className="border-t border-[#2a2e7d]/30 bg-white align-top text-[#1a1a1a]">
                  <td className="px-4 py-4 font-bold text-[#1a1a1a]">{index + 1}.</td>
                  <th scope="row" className="px-4 py-4 font-semibold text-[#1a1a1a]">{row.service}</th>
                  <td className="px-4 py-4 leading-relaxed text-[#1a1a1a]">{row.customer}</td>
                  <td className="px-4 py-4 leading-relaxed text-[#1a1a1a]">{row.ours}</td>
                  <td className="px-4 py-4 font-semibold leading-relaxed text-[#1a1a1a]">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ol className="divide-y md:hidden">
          {rows.map((row, index) => (
            <li key={row.service} className="px-5 py-5">
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span>
                <h3 className="pt-1 font-bold text-primary">{row.service}</h3>
              </div>
              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-accent">{columns.customer}</dt>
                  <dd className="mt-1 leading-relaxed text-[#1a1a1a]">{row.customer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-accent">{columns.ours}</dt>
                  <dd className="mt-1 leading-relaxed text-[#1a1a1a]">{row.ours}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-accent">{columns.time}</dt>
                  <dd className="mt-1 font-medium leading-relaxed text-foreground">{row.time}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>

        <div className="bg-white px-5 pt-4 text-center text-[#1a1a1a]">
          <p className="text-balance font-bold sm:text-lg">{data.footnote}</p>
          <p className="mt-1 pb-3 text-xs leading-relaxed tracking-wider text-[#2a2e7d] sm:text-sm">
            Address: {address} &nbsp;|&nbsp; Email: {email} &nbsp;|&nbsp; Website: {website}
          </p>
        </div>
        <div className="bg-[#648d3c] px-5 py-2 text-center text-sm font-medium italic tracking-widest text-white sm:text-lg">
          {tagline}
        </div>
      </div>
    </section>
  )
}

export default function ServiceCharterPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">About Us</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl">Service Delivery Charter</h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">{tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#english" className="rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90">English</a>
              <a href="#kiswahili" className="rounded-md border border-primary-foreground/30 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-primary-foreground/10">Kiswahili</a>
              <a
                href="/downloads/service-charter-2026.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-primary-foreground/10"
              >
                <Download className="size-4" aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>
        </section>

        <section className="bg-background py-14">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:px-8">
            <CharterTable data={english} />
            <CharterTable data={kiswahili} />

            <div className="grid gap-4 rounded-lg border bg-card p-6 shadow-sm sm:grid-cols-3">
              <p className="flex items-start gap-3 text-sm leading-relaxed">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <span>{address}</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-relaxed">
                <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </p>
              <p className="flex items-start gap-3 text-sm leading-relaxed">
                <Globe className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <a href={`https://${website}`} className="hover:underline">{website}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
