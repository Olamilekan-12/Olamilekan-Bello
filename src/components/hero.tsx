'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from './ui/use-toast';

const facts = [
  { value: '6+', label: 'Years shipping production systems' },
  { value: '2M+', label: 'Daily transactions handled' },
  { value: '250K+', label: 'Users served across platforms' },
  { value: '100+', label: 'Enterprise clients supported' },
];

const focus = [
  'Real estate intelligence',
  'Data platforms',
  'Distributed systems',
  'AI enabled products',
];

export function Hero() {
  const { toast } = useToast();

  const handleDownloadResume = () => {
    toast({
      title: 'Downloading CV',
      description: 'Your download will begin shortly.',
    });
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/bello-olamilekan.pdf';
      link.download = 'Bello_Olamilekan_Olayinka_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center border-b border-border pt-28 pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Lagos, Nigeria
            <span className="text-border">/</span>
            Available for software engineering roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-8 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.02] text-foreground"
          >
            Bello Olamilekan
            <br />
            Olayinka
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground"
          >
            Principal Software Engineer building data intensive platforms for real
            estate intelligence. I design the architecture, model the data, and take
            the system all the way into production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground"
          >
            {focus.map((item) => (
              <span
                key={item}
                className="border border-border rounded-full px-3 py-1"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button onClick={handleDownloadResume} size="lg" className="group">
              Download CV
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>

            <Button variant="outline" size="lg" className="group" asChild>
              <a href="#projects">
                View selected work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 border-t border-border pt-8"
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-2xl md:text-3xl tabular-nums text-foreground">
                  {fact.value}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-muted-foreground">
                  {fact.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
