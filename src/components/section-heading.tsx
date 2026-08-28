'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  lede?: string;
}

export function SectionHeading({ index, label, title, lede }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl"
    >
      <div className="flex items-baseline gap-3 border-t border-border pt-4">
        <span className="font-mono text-xs tabular-nums text-muted-foreground">{index}</span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
      </div>
      <h2 className="mt-6 text-3xl md:text-[2.6rem] leading-[1.1] font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
          {lede}
        </p>
      )}
    </motion.div>
  );
}
