import Image from 'next/image'
import { ArrowRight, Quote } from 'lucide-react'

export function PrincipalMessage() {
  return (
    <section id="principal" aria-labelledby="principal-heading" className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg border-8 border-primary-foreground/10 shadow-2xl">
          <Image src="/images/principal-portrait.png" alt="Principal of Godoma Technical Training Institute" width={700} height={900} className="aspect-[4/5] object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-primary/90 p-5 backdrop-blur-sm">
            <p className="font-bold">Mrs. Hafsa Seif</p>
            <p className="text-sm text-primary-foreground/70">Principal / Board Secretary</p>
          </div>
        </div>
        <div>
          <Quote className="size-10 text-accent" aria-hidden="true" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-accent">Message from the Principal</p>
          <h2 id="principal-heading" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Skills that open doors and shape communities.</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-primary-foreground/80">
            <p>Welcome to Godoma Technical Training Institute, where practical learning, character and innovation come together to prepare our trainees for a changing world.</p>
            <p>Our dedicated staff and industry-informed programmes give every learner the confidence to build a meaningful career, create opportunities and contribute to the development of our country.</p>
          </div>
          <a href="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-accent hover:text-primary-foreground">
            Read about Godoma TTI <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default PrincipalMessage
