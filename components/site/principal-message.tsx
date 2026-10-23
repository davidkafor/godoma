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
          <p className="mt-4 text-pretty text-lg leading-relaxed text-white">It is my great pleasure to welcome you to Godoma Technical Training Institute (GTTI), an institution committed to providing quality technical and vocational education and training that empowers individuals with the knowledge, practical skills, and competencies needed to succeed in today&apos;s dynamic world.</p>
          <p className="mt-4 text-pretty leading-relaxed text-white">Whether you are beginning your technical journey or advancing your skills, you are welcome to learn, create and grow with us.</p>
          <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:text-accent">Read about Godoma TTI <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
