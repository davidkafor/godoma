import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'

export function PrincipalMessage() {
  return (
    <section aria-labelledby="principal-message-heading" className="bg-secondary py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-primary p-3 shadow-xl">
          <Image src="/images/principal-portrait-updated.webp" alt="Principal of Godoma Technical Training Institute" width={640} height={800} className="aspect-[4/5] w-full object-cover" />
          <div className="px-3 py-4 text-primary-foreground"><p className="text-lg font-bold">Caroline Musyimi</p><p className="text-sm text-primary-foreground/75">Principal</p></div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-foreground">A message from the principal</p>
          <h2 id="principal-message-heading" className="mt-3 text-balance text-3xl font-extrabold text-primary sm:text-4xl">Welcome to Godoma TTI</h2>
          <Quote className="mt-6 size-10 text-accent" aria-hidden="true" />
          <p className="mt-4 text-pretty text-lg leading-relaxed text-white">Welcome to Godoma Technical Training Institute (GTTI), where we are committed to empowering individuals with practical skills, knowledge, and competencies for employment, entrepreneurship, and lifelong learning.</p>
          <p className="mt-4 text-pretty leading-relaxed text-white">Located in Vitengeni, Ganze Sub-County, Kilifi County, Godoma TTI provides technical and vocational education and training aimed at nurturing competent, innovative, and responsible graduates who can contribute meaningfully to national development. We offer a wide range of programmes designed to respond to industry needs and equip our trainees for a changing world of work.</p>
          <p className="mt-4 text-pretty leading-relaxed text-white">At Godoma, we believe that every learner deserves an opportunity to succeed. We are committed to providing a supportive learning environment that promotes skills development, innovation, integrity, inclusivity, and excellence. Through partnerships with industry, government, and our community, we continue to strengthen the relevance and quality of our training.</p>
          <p className="mt-4 text-pretty leading-relaxed text-white">As we look to the future, our focus remains on expanding access to quality training, embracing innovation and technology, and creating opportunities for our trainees to transform their lives and communities.</p>
          <p className="mt-4 text-pretty leading-relaxed text-white">I invite prospective trainees, parents, employers, development partners, and other stakeholders to explore our website, discover our programmes, and partner with us in building a skilled and productive society.</p>
          <p className="mt-4 text-pretty leading-relaxed text-white">Welcome to Godoma TTI — where skills are nurtured, talents are developed, and futures are transformed.</p>
          <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:text-accent">Read about Godoma TTI <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
