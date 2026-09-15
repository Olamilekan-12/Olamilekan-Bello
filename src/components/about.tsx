'use client';

import { motion } from 'framer-motion';
import { Waypoints, Radar, BadgeCheck } from 'lucide-react';
import { SectionHeading } from './section-heading';

const pillars = [
  {
    icon: Waypoints,
    title: 'Database through to interface',
    description:
      'I prefer owning a feature end to end: the schema, the API, the screens people actually use, and the deployment that puts it in front of them.',
  },
  {
    icon: Radar,
    title: 'Products across industries',
    description:
      'Logistics and shipment tracking, workforce and HR operations, payments, and custom software built for client businesses.',
  },
  {
    icon: BadgeCheck,
    title: 'AWS certified',
    description:
      'AWS Certified Solutions Architect – Associate and AWS Certified Developer – Associate, with a BSc in Computer Science from the University of Lagos.',
  },
];

const experience = [
  {
    company: 'Avant Tech',
    role: 'Full Stack Engineer',
    period: '2026',
    url: 'https://avant-techng.net/',
    description:
      'Workforce and technology services company in Lagos covering recruitment, background checks, payroll, staff management and custom software. I built application screens for their customer experience platform, with row level security and audit trails for regulated industries.',
  },
  {
    company: 'Send24',
    role: 'Frontend Engineer',
    period: 'Feb 2025 – Present',
    url: 'https://www.send24.co/',
    description:
      'Same day delivery across all 36 states of Nigeria, with flat rate pricing, real time tracking, low cost hub drop offs, bulk shipping for enterprises and a vendor app. I work on the web platform covering quotes, hub search, booking and tracking.',
  },
  {
    company: 'DevHeit',
    role: 'Frontend Engineer',
    period: '2024',
    url: 'https://ng.linkedin.com/company/devheit',
    description:
      'Software development and IT consulting company building web and mobile solutions for businesses in the public and private sectors. I built scalable, secure web applications for client projects.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          label="About"
          title="Full stack, mostly TypeScript."
          lede="Principal Software Engineer with 3+ years building production web applications in JavaScript and TypeScript across logistics, workforce technology and client software."
        />

        <div className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="space-y-5 text-base leading-relaxed text-muted-foreground"
          >
            <p>
              My primary stack is TypeScript and JavaScript across React, Next.js,
              Node.js and Express. Most of what I build comes down to the same
              ingredients: backend APIs, database driven applications, real time
              features, dashboards, payment flows and the customer facing product on
              top of them.
            </p>
            <ol className="border-t border-border">
              {experience.map((job) => (
                <li key={job.company} className="border-b border-border py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {job.company}
                    </a>
                    <span className="font-mono text-xs tabular-nums">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/80">{job.role}</p>
                  <p className="mt-2 text-sm leading-relaxed">{job.description}</p>
                </li>
              ))}
            </ol>
            <p>
              Across all of it I care about writing software that stays
              understandable, maintainable and reliable once other people have to
              work on it.
            </p>
          </motion.div>

          <div className="space-y-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex gap-4 border-t border-border pt-6"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 mt-0.5 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
