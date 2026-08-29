'use client';

import { motion } from 'framer-motion';
import { Waypoints, Radar, Gauge } from 'lucide-react';
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
    title: 'Real estate products',
    description:
      'Property investment analytics, listings, booking systems, property operations, portfolio monitoring, comparison and market research.',
  },
  {
    icon: Gauge,
    title: 'Production scale',
    description:
      'Systems serving 250,000+ users and 100+ enterprise clients, including a platform processing 2M+ daily transactions.',
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
          lede="Principal Software Engineer with 6+ years building production web applications in JavaScript and TypeScript, with a lot of that time spent on real estate products."
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
            <p>
              At <span className="text-foreground font-medium">ManzilIQ</span> I built a
              property investment platform for the Dubai market across the frontend,
              the Express and PostgreSQL backend, and the production infrastructure. At{' '}
              <span className="text-foreground font-medium">Denhunt</span> I build a
              property management platform for shortlet and hostel operators, covering
              bookings, availability, payments, staff and a marketplace that runs on the
              same data.
            </p>
            <p>
              Earlier work includes a real estate platform with 40,000+ listings and
              100,000+ daily API requests. Across all of it I care about writing
              software that stays understandable, maintainable and reliable once other
              people have to work on it.
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
