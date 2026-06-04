import { SectionReveal } from '../layout/section-reveal';
import { FadeIn } from '../motion/fade-in';

const highlights = ['performance', 'design systems', 'fullstack', 'scalable apps'];

const timeline = [
  { year: '2024', title: 'Fullstack focus', desc: 'Shipping production apps with React & Node.' },
  { year: '2025', title: 'Portfolio v4', desc: 'Refined personal brand and project showcase.' },
  { year: '2026', title: 'Premium rebuild', desc: 'Modern motion, design tokens, and UX polish.' },
];

const AboutSection = () => (
  <section id="about" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionReveal>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">About</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Crafting products where{' '}
          <span className="text-muted">engineering meets design.</span>
        </h2>
      </SectionReveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn delay={0.1}>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            I build fast, accessible web experiences — from interfaces to APIs. I care about
            clean architecture, thoughtful motion, and details that make products feel premium.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            My philosophy: ship iteratively, measure what matters, and leave codebases better
            than you found them.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((word) => (
              <span
                key={word}
                className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary"
              >
                {word}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-0 border-l border-border pl-6">
            {timeline.map((item, i) => (
              <div key={item.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[25px] top-1 h-2 w-2 rounded-full bg-primary" />
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {item.year}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default AboutSection;
