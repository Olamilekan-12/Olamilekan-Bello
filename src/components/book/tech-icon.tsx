import type { IconType } from 'react-icons';
import {
  SiGo, SiTypescript, SiJavascript, SiPython, SiAngular, SiReact, SiNextdotjs, SiRedux,
  SiReactquery, SiTailwindcss, SiShadcnui, SiNodedotjs, SiNestjs, SiExpress, SiGin, SiFastapi,
  SiDjango, SiPostgresql, SiMongodb, SiRedis, SiApachekafka, SiRabbitmq, SiDocker, SiKubernetes,
  SiTerraform, SiGithubactions, SiJest, SiPytest, SiK6, SiOpentelemetry, SiPrometheus, SiGrafana,
  SiSentry, SiScikitlearn, SiGooglemaps,
  FaAws, TbSql, VscAzure,
  SiVite, SiStripe, SiAuth0, SiCloudinary, SiMongoose,
} from './brand-icons';

const icons: Record<string, IconType> = {
  Go: SiGo,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  SQL: TbSql,
  Angular: SiAngular,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'React Native': SiReact,
  'Redux Toolkit': SiRedux,
  'React Query': SiReactquery,
  'Tailwind CSS': SiTailwindcss,
  'shadcn/ui': SiShadcnui,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  Express: SiExpress,
  Gin: SiGin,
  FastAPI: SiFastapi,
  Django: SiDjango,
  PostgreSQL: SiPostgresql,
  PostGIS: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  'Apache Kafka': SiApachekafka,
  RabbitMQ: SiRabbitmq,
  'AWS EKS': FaAws,
  'AWS Lambda': FaAws,
  'AWS RDS': FaAws,
  'AWS S3': FaAws,
  'Microsoft Azure': VscAzure,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  'GitHub Actions': SiGithubactions,
  Jest: SiJest,
  Pytest: SiPytest,
  k6: SiK6,
  OpenTelemetry: SiOpentelemetry,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  Sentry: SiSentry,
  'scikit-learn': SiScikitlearn,
  'Google Maps': SiGooglemaps,
  Vite: SiVite,
  Stripe: SiStripe,
  Auth0: SiAuth0,
  Cloudinary: SiCloudinary,
  Mongoose: SiMongoose,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}

export function hasTechIcon(name: string) {
  return name in icons;
}
