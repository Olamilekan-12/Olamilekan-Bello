'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: 'Email',
    url: 'mailto:bello.olakay@example.com',
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Bello Olamilekan
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Fullstack Software Engineer crafting exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex items-center space-x-4
            ">
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
            <div key={i}>
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

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to my newsletter for the latest updates and articles.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 text-sm rounded-l-lg border border-r-0 border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-r-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Bello Olamilekan. All rights reserved.
          </p>
          {/* <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
