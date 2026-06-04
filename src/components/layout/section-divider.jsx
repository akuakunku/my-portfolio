export function SectionDivider() {
  return (
    <div className="relative h-24 w-full overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
    </div>
  );
}
