'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { SectionHeading } from './section-heading';

const projects = [
  {
    title: 'ManzilIQ',
    domain: 'Real estate investment intelligence',
    location: 'Dubai, UAE',
    description:
      'A property intelligence platform for the Dubai market. Investors analyse stock through ROI analysis, property scoring, portfolio monitoring, comparison and market research, with geographic analysis and server generated investment reports.',
    contribution:
      'Designed and delivered end to end, from data model and backend services to analytics interfaces and production infrastructure.',
    technologies: ['Next.js', 'Express', 'PostgreSQL', 'Redis', 'WebSockets', 'ECharts', 'Stripe'],
    demo: 'https://www.manziliq.com',
    image: '/images/manziliq.png',
  },
  {
    title: 'Denhunt',
    domain: 'Property operations and marketplace',
    location: 'Nigeria',
    description:
      'The system of record shortlet and hostel businesses run their operation on, covering bookings, unified availability, payments, expenses, staff roles and guest messaging, with a marketplace published from the same records.',
    contribution:
      'Architected the platform so booking integrity and listing accuracy are enforced by the database rather than by policy.',
    technologies: ['PostgreSQL', 'Supabase', 'Next.js', 'TypeScript', 'Zustand', 'shadcn/ui'],
    demo: 'https://denhunt.com',
    image: '/images/denhunt.png',
  },
  {
    title: 'Avant One',
    domain: 'Customer experience platform',
    location: 'Regulated industries',
    description:
      'Application surfaces for a CX platform serving regulated sectors, where auditability and access control are product requirements rather than afterthoughts.',
    contribution:
      'Built the frontend against PostgreSQL with row level security, so tenant isolation is enforced at the data layer.',
    technologies: ['React', 'Supabase', 'PostgreSQL', 'shadcn/ui'],
    demo: 'https://app.avantone.io/',
    image: '/images/avantone.png',
  },
  {
    title: 'Send24',
    domain: 'Logistics and hub based shipping',
    location: 'Nigeria',
    description:
      'The customer facing platform for a nationwide delivery service built on low cost hub logistics, covering booking a shipment through to tracking it.',
    contribution:
      'Worked across the web client and backend, keeping pricing and tracking legible to non technical senders while modelling real hub routing underneath.',
    technologies: ['Next.js', 'Laravel', 'SQL', 'SwiftUI'],
    demo: 'https://send24.co/',
    image: '/images/send24.png',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          label="Selected work"
          title="Platforms built around property data."
          lede="Systems I designed and shipped, most of them carrying live business data in production today."
        />

        <div className="mt-14 space-y-20 md:space-y-24">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted/30"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </a>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{project.location}</span>
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-primary">
                  {project.domain}
                </p>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground border-l-2 border-border pl-4">
                  {project.contribution}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-1"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center gap-6">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    Visit platform
                    <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
