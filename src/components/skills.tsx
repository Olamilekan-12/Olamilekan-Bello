'use client';

import { motion } from 'framer-motion';
import { Code, Cpu, Database, Smartphone, CpuIcon, Server, GitBranch, Layers, Cloud } from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    icon: <Code className="h-6 w-6 text-primary" />,
    items: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    category: 'Backend & Systems',
    icon: <Server className="h-6 w-6 text-primary" />,
    items: [
      { name: 'Node.js', level: 90 },
      { name: 'Go (Golang)', level: 85 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'System Design', level: 90 },
      { name: 'Microservices', level: 85 },
      { name: 'Distributed Systems', level: 85 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: <Cloud className="h-6 w-6 text-primary" />,
    items: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 85 },
      { name: 'CI/CD Pipelines', level: 90 },
      { name: 'Terraform', level: 80 },
      { name: 'Serverless', level: 85 },
    ],
  },
  {
    category: 'Database & Storage',
    icon: <Database className="h-6 w-6 text-primary" />,
    items: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'DynamoDB', level: 85 },
      { name: 'Redis', level: 85 },
      { name: 'Elasticsearch', level: 75 },
      { name: 'Message Queues', level: 85 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Technical Expertise
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I specialize in building scalable, high-performance systems with expertise in distributed systems, cloud architecture, and container orchestration. Here are the technologies I excel at.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {skill.category}
                </h3>
              </div>
              <div className="space-y-4">
                {skill.items.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/90">{item.name}</span>
                      <span className="text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 bg-primary/5 p-8 rounded-xl border border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 pr-0 md:pr-8 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Always Learning & Growing
              </h3>
              <p className="text-muted-foreground">
                Technology never stands still, and neither do I. I&apos;m constantly exploring new technologies and techniques to stay at the forefront of web development.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CpuIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="p-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <div className="p-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
