'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Paydeet',
    description: 'Streamlined Payment Process And Total Control Over Transactions',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Flutterwave'],
    github: '#',
    demo: 'https://dev-staging.d2mjatc7mjgnas.amplifyapp.com/',
    image: '/images/paydeet.png',
  },
  {
    title: 'send24',
    description: 'Embark on a low cost shipping experience with our hub services',
    technologies: ['Next.js (Web)', 'Swift UI (APP)', 'Laravel', 'SQL'],
    github: '#',
    demo: 'https://send24.co/',
    image: '/images/send24.png',
  },
  {
    title: 'Micro Influx',
    description: 'Your Gateway to Influencer Marketing Success',
    technologies: ['NextJS', "Stripe", "SQL","Python"],
    github: '#',
    demo: 'https://staging.d21q4gz1x551q.amplifyapp.com/',
    image: '/images/micro-influx.png',
  },
 
  {
    title: 'BarelyHuman',
    description: 'Shop your best gym outfit to chase better, not perfect.',
    technologies: ['Shopify', "Apple Pay", "Google Pay","Shop Pay"],
    github: '#',
    demo: 'https://www.barelyhuman.com/',
    image: '/images/barelyhuman.png',
  },

];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-muted/30 relative overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={`${project.title} preview`} 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4 mr-1.5" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-1.5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Interested in seeing more of my work?
          </p>
          <a
            href="https://github.com/Olamilekan-12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors font-medium"
          >
            View All Projects on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
