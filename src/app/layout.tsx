'use client';

import { Inter, Fira_Code } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Bello Olamilekan Olayinka | Principal Software Engineer</title>
        <meta name="description" content="Principal Software Engineer building production web applications in JavaScript and TypeScript, with React, Next.js, Node.js and PostgreSQL." />
        <meta name="keywords" content="Principal Software Engineer, JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, AWS, Full Stack Developer, Real Estate Software" />
        <meta name="author" content="Bello Olamilekan Olayinka" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://olamilekan-bello.vercel.app" />
        <meta property="og:title" content="Bello Olamilekan Olayinka | Principal Software Engineer" />
        <meta property="og:description" content="Principal Software Engineer building production web applications in JavaScript and TypeScript, with React, Next.js, Node.js and PostgreSQL." />
        <meta property="og:site_name" content="Bello Olamilekan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bello Olamilekan Olayinka | Principal Software Engineer" />
        <meta name="twitter:description" content="Principal Software Engineer building production web applications in JavaScript and TypeScript, with React, Next.js, Node.js and PostgreSQL." />
        <meta name="twitter:creator" content="@bello_olamilekan" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
