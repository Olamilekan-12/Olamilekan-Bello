'use client';

import { motion } from 'framer-motion';
import { Code, Database, Server } from 'lucide-react';

export function About() {
  const skills = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces using React, Next.js, and modern CSS frameworks.',
    },
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: 'Backend Development',
      description: 'Creating robust and scalable server-side applications with Node.js, Express, and various databases.',
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: 'Database Management',
      description: 'Designing and optimizing database schemas and writing efficient queries for MongoDB and SQL databases.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Crafting Digital Experiences
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I am the Founder of Denhunt Ltd and a passionate Fullstack Software Engineer with experience in building scalable, user-focused applications.
              I specialize in JavaScript/TypeScript technologies, including React, Next.js, Node.js, and Express.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mb-6">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {skill.title}
                </h3>
                <p className="text-muted-foreground">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 bg-primary/5 p-8 rounded-xl border border-primary/10"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 pr-0 md:pr-8 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Let&apos;s Build Something Amazing Together
                </h3>
                <p className="text-muted-foreground">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  Get In Touch
                  <svg
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
