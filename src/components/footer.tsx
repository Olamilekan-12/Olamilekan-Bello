'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Newsletter } from './newsletter';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Olamilekan-12',
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: 'Twitter',
    url: 'https://x.com/KingKong121211',
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/olamilekan-bello-3810b6275/',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: 'Email',
    url: 'mailto:belloolamilekan661@gmail.com',
    icon: <Mail className="h-5 w-5" />,
  },
];

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
    ],
  },
//   {
//     title: 'Legal',
//     links: [
//       { name: 'Privacy Policy', href: '/privacy' },
//       { name: 'Terms of Service', href: '/terms' },
//       { name: 'Cookie Policy', href: '/cookies' },
//     ],
//   },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-base font-semibold tracking-tight text-foreground">
                bello<span className="text-muted-foreground">.olamilekan</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Principal Software Engineer building production web applications in JavaScript and TypeScript, from the database through to the interface.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, i) => (
            <div key={i} className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-4">
            <Newsletter />
          </div>

          
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Bello Olamilekan. All rights reserved.
          </p>
       
        </div>
      </div>
    </footer>
  );
}
