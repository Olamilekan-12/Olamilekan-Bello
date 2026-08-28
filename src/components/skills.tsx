'use client';

import { motion } from 'framer-motion';
import {
  Blocks,
  TableProperties,
  ScanLine,
  Boxes,
  Frame,
  Binary,
  Workflow,
  Gauge,
  Crosshair,
} from 'lucide-react';
import { SectionHeading } from './section-heading';

const stack = [
  {
    icon: Blocks,
    category: 'Backend and application',
    items: [
      'Node.js', 'Express', 'Python', 'Django', 'FastAPI', 'Go', 'C#',
      'REST', 'GraphQL', 'WebSockets', 'Microservices',
    ],
  },
  {
    icon: TableProperties,
    category: 'Databases',
    items: [
      'PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Redis',
      'Data modelling', 'Query optimisation', 'Row level security',
    ],
  },
  {
    icon: ScanLine,
    category: 'Search and data systems',
    items: [
      'Elasticsearch', 'AWS Kinesis', 'Analytics pipelines',
      'Search systems', 'Data retrieval', 'Business intelligence',
    ],
  },
  {
    icon: Boxes,
    category: 'Cloud and infrastructure',
    items: [
      'AWS', 'Lambda', 'EC2', 'RDS', 'S3', 'API Gateway',
      'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Vercel',
    ],
  },
  {
    icon: Frame,
    category: 'Frontend',
    items: [
      'React', 'Next.js', 'TypeScript', 'TanStack Query', 'Zustand',
      'Redux', 'Tailwind CSS', 'shadcn/ui', 'Vue.js', 'Nuxt',
    ],
  },
  {
    icon: Binary,
    category: 'AI and intelligent applications',
    items: [
      'AI powered applications', 'Conversational interfaces',
      'Data driven products', 'Analytics', 'Search and retrieval',
    ],
  },
  {
    icon: Workflow,
    category: 'APIs and integrations',
    items: [
      'Stripe', 'Twilio', 'Resend', 'Google OAuth',
      'Google Maps Platform', 'Google Analytics Data API', 'Slack API',
    ],
  },
  {
    icon: Gauge,
    category: 'Testing and observability',
    items: [
      'Jest', 'Cypress', 'Pytest', 'Go Test', 'k6',
      'Artillery', 'Postman', 'Prometheus', 'Grafana',
    ],
  },
  {
    icon: Crosshair,
    category: 'Engineering practice',
    items: [
      'System architecture', 'Distributed systems', 'Performance engineering',
      'Security', 'Observability', 'CI/CD', 'Design systems',
      'Technical leadership',
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          label="Capabilities"
          title="The stack I work in."
          lede="Backend architecture, data engineering, cloud infrastructure and modern frontend, applied to systems that carry real business data."
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
