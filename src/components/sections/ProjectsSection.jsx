import { projects } from '../../data/projects';
import { HoverCard } from '../motion/hover-card';
import { SectionReveal } from '../layout/section-reveal';

const ProjectsSection = () => (
  <section id="portfolio" className="relative py-20 md:py-30">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionReveal>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Work</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Selected projects
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          A curated set of apps and tools — from fullstack products to streaming utilities.
        </p>
      </SectionReveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <HoverCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
