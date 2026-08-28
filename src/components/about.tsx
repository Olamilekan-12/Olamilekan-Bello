'use client';

import { motion } from 'framer-motion';
import { Radar, Combine, Waypoints } from 'lucide-react';
import { SectionHeading } from './section-heading';

const pillars = [
  {
    icon: Radar,
    title: 'Real estate intelligence',
    description:
      'Investment analysis, ROI modelling, property scoring, portfolio monitoring and market research, built on top of large property datasets.',
  },
  {
    icon: Combine,
    title: 'Data intensive platforms',
    description:
      'Schema design, analytics pipelines, search and retrieval, and reporting layers that keep complex business data queryable and correct.',
  },
  {
    icon: Waypoints,
    title: 'Systems and delivery',
    description:
      'Distributed architecture, event driven services, cloud infrastructure and the production operations that keep them running.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          label="About"
          title="I build the systems behind property data."
          lede="Principal Software Engineer with 6+ years designing, building and scaling production software across real estate technology, SaaS, fintech, logistics and AI enabled products."
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
              My work sits where property data meets engineering. At{' '}
              <span className="text-foreground font-medium">ManzilIQ</span> I
              independently designed and delivered a Dubai real estate investment
              intelligence platform from the ground up, covering architecture,
              backend, data, analytics, frontend, integrations and production
              infrastructure.
            </p>
            <p>
              At <span className="text-foreground font-medium">Denhunt</span> I lead
              engineering on a property operations platform, placing critical business
              invariants at the database layer so booking integrity and listing
              accuracy are structural guarantees rather than policy. Earlier, I built
              APIs and booking infrastructure for a property platform managing 40,000+
              listings and 100,000+ daily API requests.
            </p>
            <p>
              Across those systems I care about the same things: data models that stay
              honest under pressure, interfaces that respect the person reading them,
              and shipping work that moves a real business number.
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
