// Single source of truth for the portfolio. Mirrors public/bello-olamilekan-olayinka-cv.pdf.
// Bullets support **bold** spans for the phrase a reader should catch first.

export const person = {
  name: 'Bello Olamilekan',
  title: 'Full-Stack Engineer',
  focus: ['Distributed Systems', 'Backend Architecture', 'Real-Time Applications'],
  location: 'Lagos, Nigeria',
  phone: '+234 901 761 2901',
  phoneHref: 'tel:+2349017612901',
  email: 'belloolamilekan166@gmail.com',
  github: 'https://github.com/Olamilekan-12',
  githubLabel: 'github.com/Olamilekan-12',
  linkedin: 'https://www.linkedin.com/in/olamilekan-bello-3810b6275/',
  linkedinLabel: 'in/olamilekan-bello',
  cvPdf: '/bello-olamilekan-olayinka-cv.pdf',
};

export const summary =
  'Full-Stack Engineer experienced in designing, building, and operating scalable web and mobile applications, distributed backend services, and real-time transaction platforms. Proficient in Go, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, Redis, Apache Kafka, and Kubernetes, with experience spanning system architecture, API development, database design, event-driven processing, cloud infrastructure, and production observability.';

export const summaryClose =
  'Delivered solutions across last-mile logistics, financial transaction processing, and fraud detection, with a focus on performance, reliability, data consistency, and measurable business outcomes. Experienced in technical leadership, architecture reviews, code quality, and mentoring engineers.';

export const headlineStats = [
  { value: '1,800+', label: 'riders dispatched across Lagos, Abuja and Port Harcourt' },
  { value: '<1 min', label: 'to assign a rider, down from about nine' },
  { value: '55%', label: 'fewer order-status tickets after live tracking' },
  { value: '4', label: 'surfaces: customer and rider apps, merchant dashboard, dispatch centre' },
];

export const domains = ['Last-mile logistics', 'Financial transactions', 'Fraud detection'];

export type SkillGroup = { name: string; items: string[] };

export const skills: SkillGroup[] = [
  { name: 'Programming Languages', items: ['Go', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
  {
    name: 'Frontend & Mobile',
    items: ['React', 'Next.js', 'React Native', 'Redux Toolkit', 'Zustand', 'React Query', 'Tailwind CSS', 'shadcn/ui', 'Angular'],
  },
  {
    name: 'Backend & API',
    items: ['Node.js', 'Express', 'Gin', 'NestJS', 'FastAPI', 'Django', 'REST APIs', 'WebSockets'],
  },
  {
    name: 'Databases & Messaging',
    items: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Redis', 'Apache Kafka', 'RabbitMQ', 'Data Modeling', 'Query Optimization', 'Geospatial Queries'],
  },
  {
    name: 'Cloud & Infrastructure',
    items: ['AWS EKS', 'AWS Lambda', 'AWS RDS', 'AWS S3', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'CI/CD'],
  },
  {
    name: 'Architecture & System Design',
    items: ['Distributed Systems', 'Microservices', 'Event-Driven Architecture', 'System Design', 'Idempotency', 'Double-Entry Ledgers', 'Concurrency', 'Caching', 'Asynchronous Processing', 'API Security'],
  },
  {
    name: 'Testing & Observability',
    items: ['Jest', 'Playwright', 'Pytest', 'k6', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Sentry', 'Automated Testing', 'Performance Testing'],
  },
  {
    name: 'Engineering Practices',
    items: ['Code Review', 'Architecture Reviews', 'Technical Documentation', 'Production Debugging', 'Performance Optimization', 'Technical Interviews', 'Mentoring'],
  },
];

export type Metric = { value: string; label: string };

export type Role = {
  id: string;
  company: string;
  org: string;
  role: string;
  location: string;
  period: string;
  blurb: string;
  metrics: Metric[];
  bullets: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    id: 'send24',
    company: 'Send24',
    org: 'NQB8',
    role: 'Full-Stack Engineer',
    location: 'Lagos, Nigeria',
    period: '2023 to present',
    blurb:
      'A last-mile delivery platform made up of customer and rider applications, a merchant dashboard, and a dispatch control centre.',
    metrics: [
      { value: '1,800+', label: 'riders on the network' },
      { value: '<1 min', label: 'to assign a rider, from ~9 min' },
      { value: '55%', label: 'fewer status tickets' },
    ],
    bullets: [
      'Designed and developed **dispatch, tracking, and settlement services** using PostgreSQL and PostGIS, supporting a network of more than 1,800 riders across Lagos, Abuja, and Port Harcourt.',
      'Engineered an **automated rider-dispatch engine** using Redis geospatial queries, reducing rider assignment time from approximately nine minutes to under one minute.',
      'Implemented **real-time order tracking** using WebSockets and Google Maps, contributing to a 55% reduction in order-status support tickets and improving delivery visibility for customers and merchants.',
      'Developed an **offline-first React Native rider application** with background synchronization and resilient status updates, maintaining delivery data accuracy in areas with unreliable network connectivity.',
      'Implemented **OTP verification and photo-based proof of delivery** to strengthen delivery accountability, improve auditability, and support dispute resolution.',
      'Automated **cash-on-delivery reconciliation** and settlement workflows, improving transaction traceability and reducing manual reconciliation overhead.',
      'Integrated application and backend workflows across **order creation, dispatch, delivery confirmation, and settlement** to support reliable end-to-end delivery operations.',
    ],
    stack: ['PostgreSQL', 'PostGIS', 'Redis', 'WebSockets', 'Google Maps', 'React Native'],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  bullets: string[];
  /** Deployed projects get a showcase page with a screenshot and a live link. */
  live?: { url: string; label: string; image: string; blurb: string };
};

export const projects: Project[] = [
  {
    id: 'eatgo',
    name: 'EatGo',
    tagline: 'Nigerian meals, delivered fast',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Stripe', 'Auth0', 'Cloudinary', 'Tailwind CSS'],
    live: {
      url: 'https://eatgo-client.vercel.app/',
      label: 'eatgo-client.vercel.app',
      image: '/images/eatgo.png',
      blurb:
        'A full-stack food ordering platform for Nigerian restaurants. Diners search by city, restaurant or cuisine, pay through Stripe and follow their order live; restaurant owners manage their menu and move incoming orders through to delivery.',
    },
    bullets: [
      'Built the **React and TypeScript frontend** and the **Express, MongoDB and Mongoose API** behind it, with Auth0 sign-in and JWT validation on every protected route.',
      'Integrated **Stripe Checkout in naira**, pricing every line item on the server from the restaurant menu, with a **signature-verified webhook** that marks orders as paid.',
      'Modelled an **order lifecycle** from placed and paid through in progress, out for delivery and delivered, with the customer order page **polling for status every five seconds**.',
      'Wrote a **background job that auto-cancels ignored orders** once the estimated delivery time passes, filtered on status so it cannot race a restaurant confirming, and guarded so a late payment never revives a cancelled order.',
      'Built **restaurant search** by city, name or cuisine with cuisine filters, sorting and pagination, **escaping user input** before it reaches MongoDB regex queries.',
      'Built a **restaurant dashboard** for managing details, menus and **Cloudinary image uploads**, and for updating the status of incoming orders.',
    ],
  },
  {
    id: 'send24',
    name: 'Send24',
    tagline: 'Same-day delivery across Nigeria',
    stack: ['React Native', 'PostgreSQL', 'PostGIS', 'Redis', 'WebSockets', 'Google Maps'],
    live: {
      url: 'https://www.send24.co/',
      label: 'send24.co',
      image: '/images/send24.png',
      blurb:
        'A last-mile delivery platform. Senders book and track parcels, vendors ship on subscription plans, enterprises upload bulk orders from a spreadsheet and partner stores double as drop-off and pickup hubs, with riders, merchants and a dispatch control centre working from the same data.',
    },
    bullets: [
      '**Dispatch control centre:** an automated rider-dispatch engine on Redis geospatial queries, cutting rider assignment from about nine minutes to under one.',
      '**Customers and merchants:** real-time order tracking over WebSockets and Google Maps, behind a 55% drop in order-status support tickets.',
      '**Rider app:** an offline-first React Native app with background sync, OTP verification and photo proof of delivery, accurate even on unreliable networks.',
      '**Settlement:** automated cash-on-delivery reconciliation, so every naira collected at the door is traceable back to its order.',
      '**Services underneath:** dispatch, tracking and settlement on PostgreSQL and PostGIS, serving more than 1,800 riders across Lagos, Abuja and Port Harcourt.',
    ],
  },
  {
    id: 'keepsake',
    name: 'Keepsake',
    tagline: 'Your photo on a one-of-one phone case',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Neon', 'Paystack', 'Kinde', 'Cloudinary', 'Resend'],
    live: {
      url: 'https://keepsake-nine-tan.vercel.app/',
      label: 'keepsake-nine-tan.vercel.app',
      image: '/images/keepsake.png',
      blurb:
        'A custom phone case store. Customers upload a photo, position it on an iPhone case template, choose the model, material, finish and colour, and pay in naira through Paystack; every paid order lands in an admin dashboard for shipping.',
    },
    bullets: [
      'Built the store on the **Next.js 14 App Router with Server Actions**, Prisma and PostgreSQL on Neon, and Kinde for sign-in.',
      'Built the **case designer**: drag and resize a photo on the phone template with its aspect ratio locked, then **crop it on a canvas** to exactly the printable area and store it on Cloudinary.',
      'Integrated **Paystack in naira**, pricing every case **on the server in kobo** from its material and finish, with a fresh reference for each payment attempt.',
      'Confirmed payments **two ways**, from the return page and from an **HMAC-SHA512 signed webhook** compared in constant time, both feeding one fulfilment step.',
      'Made fulfilment **exactly-once**: an order only flips to paid while it is still unpaid and when the amount and currency match the charge, so the **Resend** confirmation email goes out once.',
      'Built an **admin dashboard** for moving orders from awaiting shipment to shipped and fulfilled.',
    ],
  },
];

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Yoruba', level: 'Native' },
];
