const tones: Record<string, string> = {
  PUBLISHED: 'bg-secondary text-secondary-foreground',
  SCHEDULED: 'bg-accent text-accent-foreground',
  DRAFT: 'bg-muted text-muted-foreground ring-1 ring-inset ring-border',
}

const labels: Record<string, string> = {
  PUBLISHED: 'Published',
  SCHEDULED: 'Scheduled',
  DRAFT: 'Draft',
  NEWS: 'News',
  ANNOUNCEMENT: 'Announcement',
  ARTICLE: 'Article',
  BOARD: 'Board',
  MANAGEMENT: 'Management',
  STAFF: 'Staff',
  SUPER_ADMIN: 'Super administrator',
  ADMIN: 'Administrator',
  EDITOR: 'Editor',
}

export function StatusBadge({ value, publishedAt }: { value: string; publishedAt?: Date | null }) {
  const effective = value === 'PUBLISHED' && publishedAt && publishedAt.getTime() > Date.now() ? 'SCHEDULED' : value
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${tones[effective] ?? 'bg-muted text-foreground ring-1 ring-inset ring-border'}`}>
      {labels[effective] ?? effective}
    </span>
  )
}
