'use client';

import { motion } from 'framer-motion';
import {
  Braces,
  Frame,
  Blocks,
  TableProperties,
  Boxes,
  Wrench,
  Plug,
} from 'lucide-react';
import { SectionHeading } from './section-heading';

const stack = [
  {
    icon: Braces,
    category: 'Languages',
    items: ['JavaScript', 'TypeScript'],
  },
  {
    icon: Frame,
    category: 'Frontend',
    items: [
      'React', 'Next.js', 'TanStack Query', 'Zustand',
      'Redux', 'Tailwind CSS', 'shadcn/ui',
    ],
  },
  {
    icon: Blocks,
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'],
  },
  {
    icon: TableProperties,
    category: 'Databases and search',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    icon: Boxes,
    category: 'AWS',
    items: ['Lambda', 'EC2', 'RDS', 'S3', 'API Gateway', 'Kinesis'],
  },
  {
    icon: Wrench,
    category: 'Engineering tools',
    items: [
      'Git', 'GitHub Actions', 'Docker', 'Jest', 'Cypress',
      'Postman', 'k6', 'Grafana', 'Prometheus', 'Storybook',
    ],
  },
  {
    icon: Plug,
    category: 'Integrations',
    items: [
      'Stripe', 'Twilio', 'Resend', 'Google OAuth',
      'Google Maps', 'Google Analytics',
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          label="Stack"
          title="What I actually work in."
          lede="My primary stack is TypeScript and JavaScript across React, Next.js, Node.js and Express, backed by PostgreSQL and AWS."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {stack.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
                className="border-t border-border pt-5"
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className="h-4 w-4 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {group.category}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
