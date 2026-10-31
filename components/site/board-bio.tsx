import Image from 'next/image'

export type BoardMember = {
  name: string
  role: string
  photo: string | null
  bio: string
}

export function BoardBio({ bio, className = 'text-sm' }: { bio: string; className?: string }) {
  const paragraphs = bio.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean)

  return (
    <div className={`mt-4 flex flex-col gap-4 leading-relaxed text-muted-foreground ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="whitespace-pre-line text-pretty">{paragraph}</p>
      ))}
    </div>
  )
}

export function BoardChairmanCard({ member }: { member: BoardMember }) {
  return (
    <article className="overflow-hidden rounded-lg border bg-card shadow-sm sm:col-span-2 lg:col-span-3">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-72 bg-muted md:h-auto md:min-h-96 md:w-80 md:shrink-0">
          {member.photo && (
            <Image
              src={member.photo}
              alt={`${member.name}, ${member.role}`}
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 320px, 100vw"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{member.role}</p>
          <h3 className="mt-1 text-2xl font-bold text-primary text-balance">{member.name}</h3>
          <BoardBio bio={member.bio} className="text-base" />
        </div>
      </div>
    </article>
  )
}
