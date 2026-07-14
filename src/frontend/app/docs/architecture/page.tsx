import { Layers, Database, Shield, Cpu, FileCode, Box, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ArchitecturePage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-violet-500" />
        Architecture
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Architecture Overview</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        nextforge follows a modular monolith architecture with clear separation of concerns,
        designed for teams that need structure without sacrificing flexibility.
      </p>

      <Section title="Design Philosophy">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Convention over Configuration",
              desc: "Predictable file structure that scales across teams. Every module follows the same pattern, making it easy to navigate any part of the codebase.",
            },
            {
              title: "SQL Visibility",
              desc: "Knex keeps database interactions explicit and debuggable. No opaque ORM magic — you can always see exactly what SQL will be executed.",
            },
            {
              title: "Type-Safe End to End",
              desc: "Zod and TypeScript enforce contracts from the database to the UI. Runtime validation catches issues that static types miss.",
            },
            {
              title: "Generator-Friendly",
              desc: "The CLI scaffolds code but never hides it from you. Generated code is yours to own and modify.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Project Structure">
        <p>The source code is organized into clearly separated directories:</p>
        <CodeBlock>{`src/
  apps/           # Domain modules (users, billing, orders, etc.)
  core/           # Framework core (auth, db, config, jobs, security, middleware)
  database/       # Migrations, seeds, factories
  frontend/       # Next.js App Router pages, layouts, styles
  shared/         # Shared UI components, utilities, types, validators
  cli/            # Scaffolding CLI (make:app, make:resource, etc.)
  tests/          # Test setup and shared test utilities`}</CodeBlock>
      </Section>

      <Section title="Module System">
        <p>Each domain module follows a consistent structure:</p>
        <CodeBlock>{`apps/orders/
  controllers/     # Request handling & response formatting
  services/        # Business logic & orchestration
  repositories/    # Data access & query building
  validators/      # Zod schemas for input validation
  types/           # TypeScript type definitions
  ui/              # React components (client & server)
  routes/          # API route definitions (optional)
  pages/           # Next.js page components (optional)
  migrations/      # Database migrations (optional)
  tests/           # Module-specific tests`}</CodeBlock>
        <p>This consistent structure ensures that any developer can navigate any module without
        guessing where logic lives. The CLI enforces this convention when scaffolding.</p>
      </Section>

      <Section title="Data Flow">
        <p>Requests flow through a clearly defined pipeline:</p>
        <div className="mt-4 space-y-3">
          {[
            { step: "1. Next.js App Router", desc: "Routes the HTTP request to the appropriate handler based on the file system convention" },
            { step: "2. Middleware Pipeline", desc: "Security headers, CORS, rate limiting, CSRF, and authentication checks are applied" },
            { step: "3. Controller", desc: "Validates the input (body, query, params) using Zod schemas and delegates to the service" },
            { step: "4. Service", desc: "Orchestrates business logic, enforces permissions, coordinates multiple repositories" },
            { step: "5. Repository", desc: "Executes database queries via Knex, returns typed results" },
            { step: "6. Response", desc: "Returns a standardized API envelope (success or failure) with appropriate HTTP status" },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                {item.step[0]}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{item.step}</h4>
                <p className="mt-0.5 text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Core Framework Modules">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Authentication", href: "/docs/authentication", desc: "Password hashing (scrypt), HMAC-signed session tokens, cookie management, auth API routes" },
            { title: "API Layer", href: "/docs/api-layer", desc: "Standard response envelope, CORS, CSRF, rate limiting, Zod validation middleware" },
            { title: "Database", href: "/docs/database", desc: "Knex client singleton, BaseRepository with pagination, migrations, seeds" },
            { title: "Security", href: "/docs/security", desc: "CSP headers, XSS protection, RBAC permissions, security middleware pipeline" },
            { title: "Jobs & Queues", href: "/docs/jobs", desc: "Background job definitions, enqueueing, worker process, retry logic" },
            { title: "Frontend", href: "/docs/frontend", desc: "UI component library, layouts (AppShell, AuthLayout, SidebarLayout), dark mode" },
          ].map((item) => (
            <Link key={item.title} href={item.href as any} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
              <h3 className="font-semibold text-slate-900 group-hover:text-slate-700">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.desc}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-slate-700">
                Read more <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Key Technology Decisions">
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 pr-4 text-left font-semibold text-slate-900">Decision</th>
              <th className="py-2 pr-4 text-left font-semibold text-slate-900">Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-900">Knex over ORM</td>
              <td className="py-2 text-slate-600">Explicit SQL control, migration workflow, no hidden queries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-900">Zod over Yup/Joi</td>
              <td className="py-2 text-slate-600">Excellent TypeScript inference, small bundle, both client and server</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-900">Handlebars for CLI templates</td>
              <td className="py-2 text-slate-600">Zero runtime cost in production, simple syntax, safe by default</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-900">Tailwind CSS v4</td>
              <td className="py-2 text-slate-600">Utility-first, design tokens, dark mode, minimal bundle</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-900">Node.js crypto (no bcrypt)</td>
              <td className="py-2 text-slate-600">Zero dependencies, FIPS-compliant, timing-safe comparison</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-7 text-slate-600">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
      <code>{children}</code>
    </pre>
  );
}
