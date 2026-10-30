import Image from 'next/image'

export function SiteBanner() {
  return (
    <div className="bg-[#fff4d7]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-6 sm:px-8 sm:py-4">
        <Image
          src="/images/charter/coat-of-arms.png"
          alt="Coat of arms of the Republic of Kenya"
          width={435}
          height={428}
          priority
          className="h-16 w-auto shrink-0 sm:h-24 lg:h-32"
        />
        <p className="text-balance text-center text-lg font-black uppercase leading-[1.05] tracking-tight text-[#2d358f] sm:text-3xl lg:text-5xl">
          Godoma Technical
          <br />
          Training Institute
        </p>
        <Image
          src="/images/charter/gtti-logo.png"
          alt="Godoma Technical Training Institute logo"
          width={578}
          height={480}
          priority
          className="h-16 w-auto shrink-0 sm:h-24 lg:h-32"
        />
      </div>
    </div>
  )
}
