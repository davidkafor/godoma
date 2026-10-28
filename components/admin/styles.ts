export const inputClass =
  'block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-destructive'

export const labelClass = 'mb-1.5 block text-sm font-semibold text-foreground'

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60'

export const btnPrimary = `${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`
export const btnSecondary = `${btnBase} border border-border bg-card text-foreground hover:bg-muted`
export const btnDanger = `${btnBase} bg-destructive text-white hover:bg-destructive/90`
export const btnGhost = `${btnBase} text-foreground hover:bg-muted`
