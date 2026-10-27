// Single source of truth for the portfolio. Mirrors public/bello-olamilekan-olayinka-cv.pdf.
// Bullets support **bold** spans for the phrase a reader should catch first.

export const person = {
  name: 'Bello Olamilekan',
  title: 'Full-Stack Engineer',
  focus: ['Distributed Systems', 'Backend Architecture', 'Real-Time Applications'],
  location: 'Lagos, Nigeria',
  phone: '+234 905 863 7198',
  phoneHref: 'tel:+2349058637198',
  email: 'belloolamilekan661@gmail.com',
  github: 'https://github.com/Olamilekan-12',
  githubLabel: 'github.com/Olamilekan-12',
  linkedin: 'https://www.linkedin.com/in/olamilekan-bello-3810b6275/',
  linkedinLabel: 'in/olamilekan-bello',
  cvPdf: '/bello-olamilekan-olayinka-cv.pdf',
};

export const summary =
  'Full-Stack Engineer experienced in designing, building, and operating scalable web and mobile applications, distributed backend services, and real-time transaction platforms. Proficient in Go, TypeScript, C#, Java, React, PostgreSQL, Redis, Apache Kafka, and Kubernetes, with experience spanning system architecture, API development, database design, event-driven processing, cloud infrastructure, and production observability.';

export const summaryClose =
  'Delivered solutions across last-mile logistics, financial transaction processing, and fraud detection, with a focus on performance, reliability, data consistency, and measurable business outcomes. Experienced in technical leadership, architecture reviews, code quality, and mentoring engineers.';

export const headlineStats = [
  { value: '250K+', label: 'registered users on wagering, wallet and payment systems' },
  { value: '3M+', label: 'bet settlements with no recorded balance discrepancies' },
  { value: '1,800+', label: 'riders dispatched across Lagos, Abuja and Port Harcourt' },
  { value: '<30 ms', label: 'to pair opposing bets in the Go matching engine' },
];

export const domains = ['Last-mile logistics', 'Financial transactions', 'Fraud detection'];

export type SkillGroup = { name: string; items: string[] };

export const skills: SkillGroup[] = [
  { name: 'Programming Languages', items: ['Go', 'TypeScript', 'JavaScript', 'C#', 'Java', 'Python', 'SQL'] },
  {
    name: 'Frontend & Mobile',
    items: ['Angular', 'React', 'Next.js', 'React Native', 'Redux Toolkit', 'Zustand', 'React Query', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    name: 'Backend & API',
    items: ['Node.js', 'NestJS', 'Express', 'ASP.NET Core', 'Spring Boot', 'Gin', 'FastAPI', 'Django', 'REST APIs', 'WebSockets', 'SignalR'],
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
    items: ['Jest', 'Playwright', 'xUnit', 'Pytest', 'k6', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Sentry', 'Automated Testing', 'Performance Testing'],
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
    period: 'Feb 2025 to Oct 2026',
    blurb:
      'A last-mile delivery platform made up of customer and rider applications, a merchant dashboard, and a dispatch control centre.',
    metrics: [
      { value: '1,800+', label: 'riders on the network' },
      { value: '<1 min', label: 'to assign a rider, from ~9 min' },
      { value: '55%', label: 'fewer status tickets' },
    ],
    bullets: [
      'Designed and developed **dispatch, tracking, and settlement services** using ASP.NET Core, Spring Boot, PostgreSQL, and PostGIS, supporting a network of more than 1,800 riders across Lagos, Abuja, and Port Harcourt.',
      'Engineered an **automated rider-dispatch engine** using Redis geospatial queries, reducing rider assignment time from approximately nine minutes to under one minute.',
      'Implemented **real-time order tracking** using SignalR and Google Maps, contributing to a 55% reduction in order-status support tickets and improving delivery visibility for customers and merchants.',
      'Developed an **offline-first React Native rider application** with background synchronization and resilient status updates, maintaining delivery data accuracy in areas with unreliable network connectivity.',
      'Implemented **OTP verification and photo-based proof of delivery** to strengthen delivery accountability, improve auditability, and support dispute resolution.',
      'Automated **cash-on-delivery reconciliation** and settlement workflows, improving transaction traceability and reducing manual reconciliation overhead.',
      'Integrated application and backend workflows across **order creation, dispatch, delivery confirmation, and settlement** to support reliable end-to-end delivery operations.',
    ],
    stack: ['ASP.NET Core', 'Spring Boot', 'PostgreSQL', 'PostGIS', 'Redis', 'SignalR', 'Google Maps', 'React Native'],
  },
  {
    id: 'gmp',
    company: 'GMP',
    org: 'PikaGroup',
    role: 'Full-Stack Engineer',
    location: 'Lagos, Nigeria',
    period: 'Jan 2023 to Jan 2025',
    blurb:
      'A peer-to-peer sports wagering platform supporting bet creation, matching, escrow-based wallet operations, and automated settlement.',
    metrics: [
      { value: '250K+', label: 'registered users' },
      { value: '<30 ms', label: 'bet matching' },
      { value: '40K+', label: 'concurrent users at peak' },
    ],
    bullets: [
      '**Led a squad of six engineers** responsible for wagering, wallet, and payment systems serving more than 250,000 registered users; conducted technical interviews and mentored three engineers.',
      'Designed a **Go-based wager-matching engine** that paired opposing bets in under 30 milliseconds, supporting partial matches, concurrent requests, and automated refunds.',
      'Architected an **escrow wallet backed by a double-entry ledger** and idempotent Kafka event processing, supporting more than three million bet settlements without recorded balance discrepancies.',
      'Prepared the platform for **peak sporting events** through Kubernetes autoscaling, Redis caching, and k6 load testing, supporting more than 40,000 concurrent users during high-demand periods.',
      'Automated **bet settlement using live sports data feeds**, reducing manual intervention and settlement delays following match completion.',
      'Implemented **KYC verification, responsible-gaming controls, and audit reporting** to support regulatory compliance and review by the Lagos State Lotteries and Gaming Authority.',
      'Contributed to **system architecture, API design, code reviews**, and production reliability improvements across core transaction services.',
    ],
    stack: ['Go', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Kubernetes', 'k6'],
  },
  {
    id: 'devheit',
    company: 'Devheit',
    org: 'Fraud Detection',
    role: 'Freelance Full-Stack Engineer',
    location: 'Remote',
    period: '2024 to 2026',
    blurb:
      'Contract engagement building fraud detection services (Just Rever) and analyst tooling for transaction-intensive products.',
    metrics: [
      { value: 'Real time', label: 'transaction risk scoring' },
      { value: 'Rules + ML', label: 'configurable engine with scikit-learn' },
    ],
    bullets: [
      'Built a **real-time fraud-scoring service** using Python and FastAPI, combining a configurable rules engine with a scikit-learn model to evaluate transaction risk.',
      'Developed a **React and TypeScript dashboard** for reviewing flagged transactions, recording analyst decisions, and collecting feedback to support model improvement and retraining.',
      'Implemented **detection workflows** for account takeover, device and IP velocity anomalies, and linked-account activity, using Redis for low-latency feature lookups.',
      'Containerized services with **Docker** and automated build and deployment workflows using **GitHub Actions**, improving deployment consistency and maintainability.',
      'Integrated **Prometheus monitoring and alerting** for scoring latency and model drift to improve operational visibility and support timely investigation.',
      'Delivered integrated **backend APIs, data-processing workflows, and frontend investigation tools** for fraud analysis.',
    ],
    stack: ['Python', 'FastAPI', 'scikit-learn', 'React', 'TypeScript', 'Redis', 'Docker', 'GitHub Actions', 'Prometheus'],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  bullets: string[];
};

export const projects: Project[] = [
  {
    id: 'idempotency',
    name: 'Idempotency Middleware',
    tagline: 'for payment APIs',
    stack: ['Go', 'Node.js', 'Redis', 'PostgreSQL'],
    bullets: [
      'Designed **reusable idempotency middleware** for Go and Node.js applications, supporting integration with net/http, Gin, Express, and NestJS.',
      'Implemented **idempotency keys and request fingerprinting** to identify duplicate requests and protect payment and transfer endpoints against unintended repeated processing.',
      'Used **Redis-based coordination and PostgreSQL persistence** to support request deduplication and durable idempotency records.',
      'Structured the middleware for transaction-sensitive APIs requiring **safe retries**, predictable request handling, and consistent processing outcomes.',
    ],
  },
  {
    id: 'webhook-relay',
    name: 'Webhook Relay',
    tagline: 'for Nigerian payment gateways',
    stack: ['Go', 'Apache Kafka', 'PostgreSQL', 'Docker'],
    bullets: [
      'Designed a **self-hosted webhook relay** for Paystack, Flutterwave, and Monnify integrations, centralizing payment event ingestion and distribution.',
      'Implemented **webhook signature verification and event deduplication** to validate incoming events and reduce duplicate processing.',
      'Designed **asynchronous event distribution with Kafka**, retry handling, and dead-letter queues to improve resilience when downstream services become unavailable.',
      'Incorporated **event recovery and replay** workflows to support troubleshooting and controlled reprocessing of failed webhook deliveries.',
      'Structured the service around **containerized deployment** and persistent event records to improve maintainability and operational visibility.',
    ],
  },
];

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Yoruba', level: 'Native' },
];
