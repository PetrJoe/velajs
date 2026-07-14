import { Terminal, BookOpen, ArrowRight, Database, FileCode, Globe } from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-emerald-500" />
        Getting Started
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Build your first velajs application</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        Learn how to create a new project, configure your environment, run database migrations,
        and start the development server.
      </p>

      <div className="mt-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
        <strong>Prerequisites:</strong> Node.js 20+, npm 9+, and PostgreSQL 15+ running locally or remotely.
      </div>

      <Section title="1. Create a new project">
        <p>Scaffold a new velajs project using the CLI:</p>
        <CodeBlock>{`npx velajs create my-app
cd my-app
npm install`}</CodeBlock>
        <p>This creates a complete project structure with all framework modules, database configuration,
        authentication setup, UI primitives, and development tooling.</p>
      </Section>

      <Section title="2. Configure environment variables">
        <p>Copy the example environment file and update the values for your local setup:</p>
        <CodeBlock>{`cp .env.example .env`}</CodeBlock>
        <p>Open <InlineCode>.env</InlineCode> and configure the following essential variables:</p>
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 pr-4 text-left font-semibold text-slate-900">Variable</th>
              <th className="py-2 pr-4 text-left font-semibold text-slate-900">Required</th>
              <th className="py-2 text-left font-semibold text-slate-900">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2 pr-4 font-mono text-xs text-slate-800">DATABASE_URL</td>
              <td className="py-2 pr-4"><span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">Yes</span></td>
              <td className="py-2 text-slate-600">PostgreSQL connection string</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-xs text-slate-800">AUTH_SECRET</td>
              <td className="py-2 pr-4"><span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">Yes</span></td>
              <td className="py-2 text-slate-600">At least 16 characters for session signing</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-xs text-slate-800">NODE_ENV</td>
              <td className="py-2 pr-4"><span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">No</span></td>
              <td className="py-2 text-slate-600">Defaults to <InlineCode>development</InlineCode></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-xs text-slate-800">LOG_LEVEL</td>
              <td className="py-2 pr-4"><span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">No</span></td>
              <td className="py-2 text-slate-600">trace, debug, info, warn, error</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="3. Run database migrations">
        <p>Create the database tables defined in the framework's migrations:</p>
        <CodeBlock>{`npm run db:migrate
npm run db:seed`}</CodeBlock>
        <p>The framework ships with a <InlineCode>users</InlineCode> table migration and seed data to get started.
        You can create additional migrations using the CLI:</p>
        <CodeBlock>{`npm run make:migration create_projects_table`}</CodeBlock>
      </Section>

      <Section title="4. Start the development server">
        <CodeBlock>{`npm run dev`}</CodeBlock>
        <p>Your application will be running at <a href="http://localhost:3000" className="font-medium text-slate-900 underline">http://localhost:3000</a>.
        The development server supports hot module replacement, so changes to your code are reflected instantly.</p>
      </Section>

      <Section title="5. Create your first module">
        <p>Use the CLI to scaffold a new domain module:</p>
        <CodeBlock>{`npm run make:app blog`}</CodeBlock>
        <p>This generates a complete module structure:</p>
        <CodeBlock>{`src/apps/blog/
  controllers/     # Request handling logic
  services/        # Business logic
  repositories/    # Data access layer
  validators/      # Zod validation schemas
  types/           # TypeScript type definitions
  ui/              # React components
  routes/          # API route definitions
  migrations/      # Database migrations
  tests/           # Test files`}</CodeBlock>
      </Section>

      <Section title="6. Next steps">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href={"/docs/architecture" as any} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
            <span className="text-sm font-medium text-slate-900">Explore the architecture</span>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5" />
          </Link>
          <Link href={"/docs/cli" as any} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
            <span className="text-sm font-medium text-slate-900">CLI Reference</span>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5" />
          </Link>
          <Link href={"/docs/authentication" as any} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
            <span className="text-sm font-medium text-slate-900">Add authentication</span>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5" />
          </Link>
          <Link href={"/docs/api-layer" as any} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
            <span className="text-sm font-medium text-slate-900">Build your API</span>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5" />
          </Link>
        </div>
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

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">{children}</code>
  );
}
