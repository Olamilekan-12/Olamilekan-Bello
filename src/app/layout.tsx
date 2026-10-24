'use client';

import { Fraunces, Newsreader, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display-face',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
  style: ['normal', 'italic'],
});

const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif-body',
  display: 'swap',
  style: ['normal', 'italic'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
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
        <title>Bello Olamilekan | Full-Stack Engineer</title>
        <meta name="description" content="Full-Stack Engineer in Lagos building distributed backend services and real-time platforms in Go, TypeScript, C# and Java, with Kafka, Kubernetes, PostgreSQL and Redis." />
        <meta name="keywords" content="Full-Stack Engineer, Distributed Systems, Backend Architecture, Real-Time Applications, Go, TypeScript, C#, Java, React, Next.js, React Native, Node.js, NestJS, ASP.NET Core, Spring Boot, PostgreSQL, PostGIS, Redis, Apache Kafka, Kubernetes, Terraform, AWS, Azure, Lagos, Nigeria" />
        <meta name="author" content="Bello Olamilekan Olayinka" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://olamilekan-bello.vercel.app" />
        <meta property="og:title" content="Bello Olamilekan | Full-Stack Engineer" />
        <meta property="og:description" content="Full-Stack Engineer in Lagos building distributed backend services and real-time platforms in Go, TypeScript, C# and Java, with Kafka, Kubernetes, PostgreSQL and Redis." />
        <meta property="og:site_name" content="Bello Olamilekan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bello Olamilekan | Full-Stack Engineer" />
        <meta name="twitter:description" content="Full-Stack Engineer in Lagos building distributed backend services and real-time platforms in Go, TypeScript, C# and Java, with Kafka, Kubernetes, PostgreSQL and Redis." />
        <meta name="twitter:creator" content="@bello_olamilekan" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#e6dfd2" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#15120f" />
      </head>
      <body className={`${display.variable} ${serif.variable} ${mono.variable} font-serif antialiased`}>
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
