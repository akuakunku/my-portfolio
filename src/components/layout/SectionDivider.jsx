export function SectionDivider() {
  return (
    <div className="section-divider relative h-20 w-full overflow-hidden md:h-28" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyber-blue/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-blue/10 blur-3xl md:h-32 md:w-32" />
      <div className="absolute inset-x-8 top-1/2 h-8 -translate-y-1/2 bg-gradient-to-b from-cyber-blue/5 to-transparent blur-xl" />
    </div>
  );
}
