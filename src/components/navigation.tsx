'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';
import Link from 'next/link';
import { Sun, Moon, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-sm border-b border-border'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#home"
            className="font-mono text-sm font-semibold tracking-tight text-foreground"
          >
            bello<span className="text-muted-foreground">.olamilekan</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="/bello-olamilekan.pdf"
              download="Bello_Olamilekan_Olayinka_CV.pdf"
              className="group inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <Download
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">CV</span>
            </a>

            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle colour theme"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
