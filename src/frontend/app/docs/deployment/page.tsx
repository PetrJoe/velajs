import { Rocket, Globe, Terminal, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DeploymentPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-amber-500" />
        Deployment
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Deployment</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        Deploy your velajs application to production with Docker, managed hosting, or the
        CI/CD pipeline. This guide covers all deployment scenarios.
      </p>

      <Section title="Environment Variables">
        <p>Configure these environment variables in your production environment:</p>
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Variable</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Production Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">NODE_ENV</td>
                <td className="px-4 py-3 text-slate-600"><InlineCode>production</InlineCode></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">DATABASE_URL</td>
                <td className="px-4 py-3 text-slate-600">Managed PostgreSQL connection string</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">AUTH_SECRET</td>
                <td className="px-4 py-3 text-slate-600">Strong random value (min 32 chars)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">APP_URL</td>
                <td className="px-4 py-3 text-slate-600">Your production domain URL</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">LOG_LEVEL</td>
                <td className="px-4 py-3 text-slate-600"><InlineCode>warn</InlineCode> or <InlineCode>error</InlineCode></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Docker Deployment">
        <p>The framework includes a production-ready Dockerfile:</p>
        <CodeBlock>{`# Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Build and run</h3>
        <CodeBlock>{`# Build the image
docker build -t velajs-app .

# Run with environment variables
docker run -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e DATABASE_URL=postgres://... \\
  -e AUTH_SECRET=your-secret \\
  -e APP_URL=https://myapp.com \\
  velajs-app`}</CodeBlock>
      </Section>

      <Section title="CI/CD Pipeline">
        <p>The framework ships with a GitHub Actions workflow (<InlineCode>.github/workflows/ci.yml</InlineCode>):</p>
        <CodeBlock>{`name: CI
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: velajs_test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run db:migrate
      - run: npm test

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build`}</CodeBlock>
      </Section>

      <Section title="Platform Deployments">
        <h3 className="text-lg font-semibold text-slate-900">Vercel</h3>
        <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-slate-600">
          <li>Push your code to a GitHub repository</li>
          <li>Import the repository in Vercel</li>
          <li>Set environment variables in Vercel dashboard</li>
          <li>Deploy &mdash; Vercel auto-detects Next.js</li>
        </ol>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Fly.io</h3>
        <CodeBlock>{`# Install flyctl and launch
fly launch
fly secrets set DATABASE_URL=postgres://...
fly secrets set AUTH_SECRET=...
fly deploy`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Railway</h3>
        <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-slate-600">
          <li>Connect your GitHub repository</li>
          <li>Railway auto-detects the Dockerfile or Next.js build</li>
          <li>Provision a PostgreSQL database from the Railway dashboard</li>
          <li>Set environment variables and deploy</li>
        </ol>
      </Section>

      <Section title="Database Migrations in Production">
        <p>Run migrations as part of your deployment pipeline:</p>
        <CodeBlock>{`# Before starting the new version
npm run db:migrate

# Then start the application
npm start`}</CodeBlock>
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Important:</strong> Always run migrations <em>before</em> deploying new application code
          that depends on the new schema. This prevents race conditions during rolling deployments.
        </div>
      </Section>

      <Section title="Health Check">
        <p>Use the health check endpoint for orchestration:</p>
        <CodeBlock>{`GET /api/health

{
  "status": "ok",
  "database": "ok",
  "durationMs": 3,
  "checkedAt": "2026-01-01T00:00:00.000Z"
}`}</CodeBlock>
        <p className="mt-4">The health check verifies database connectivity and returns timing information. Configure your orchestrator to poll this endpoint.</p>
      </Section>

      <Section title="Production Checklist">
        <ul className="mt-4 list-inside list-disc space-y-3 text-sm text-slate-600">
          <li><strong>Environment variables</strong> — All required vars set, AUTH_SECRET is a strong random value</li>
          <li><strong>Database</strong> — Managed PostgreSQL with automated backups and connection pooling</li>
          <li><strong>Migrations</strong> — Run as part of the deployment pipeline</li>
          <li><strong>SSL/TLS</strong> — HTTPS enforced (Vercel/Fly.io/Railway handle this automatically)</li>
          <li><strong>Security headers</strong> — CSP and other headers are applied (see          <Link href={"/docs/security" as any} className="font-medium text-slate-900 underline">Security docs</Link>)</li>
          <li><strong>Logging</strong> — Structured JSON logs for log aggregation (Datadog, Logtail, etc.)</li>
          <li><strong>Rate limiting</strong> — Enabled with appropriate limits for production traffic</li>
          <li><strong>Health check</strong> — Configured for load balancer health probes</li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
      <code>{children}</code>
    </pre>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">{children}</code>
  );
}
