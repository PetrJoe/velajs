import { Terminal, Database, Globe } from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-sky-500" />
        Installation
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Installation & Setup</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        Complete guide to setting up your nextforge environment, from prerequisites to production configuration.
      </p>

      <Section title="Prerequisites">
        <ul className="mt-2 list-inside list-disc space-y-2">
          <li><strong>Node.js</strong> 20 or later (LTS recommended)</li>
          <li><strong>npm</strong> 9 or later (or yarn, pnpm)</li>
          <li><strong>PostgreSQL</strong> 15 or later</li>
          <li><strong>Git</strong> for version control</li>
          <li><strong>Docker</strong> (optional, for containerized development)</li>
        </ul>
      </Section>

      <Section title="Quick Start">
        <p>Scaffold a new project with a single command:</p>
        <CodeBlock>{`npx nextforge create my-project
cd my-project
npm install`}</CodeBlock>
      </Section>

      <Section title="Environment Configuration">
        <p>The framework uses environment variables for all configuration. Copy the example file and customize it:</p>
        <CodeBlock>{`cp .env.example .env`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Required Variables</h3>
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Variable</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Description</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-mono text-sm text-slate-800">DATABASE_URL</td>
                <td className="px-4 py-3 text-slate-600">PostgreSQL connection string</td>
                <td className="px-4 py-3 text-slate-500">&mdash;</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm text-slate-800">AUTH_SECRET</td>
                <td className="px-4 py-3 text-slate-600">HMAC key for session signing (min 16 chars)</td>
                <td className="px-4 py-3 text-slate-500">&mdash;</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm text-slate-800">NODE_ENV</td>
                <td className="px-4 py-3 text-slate-600">Application environment</td>
                <td className="px-4 py-3 text-slate-500"><InlineCode>development</InlineCode></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm text-slate-800">APP_URL</td>
                <td className="px-4 py-3 text-slate-600">Application URL (used for CORS)</td>
                <td className="px-4 py-3 text-slate-500"><InlineCode>http://localhost:3000</InlineCode></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm text-slate-800">LOG_LEVEL</td>
                <td className="px-4 py-3 text-slate-600">Logging verbosity</td>
                <td className="px-4 py-3 text-slate-500"><InlineCode>info</InlineCode></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm text-slate-800">JOB_QUEUE_ADAPTER</td>
                <td className="px-4 py-3 text-slate-600">Background job backend</td>
                <td className="px-4 py-3 text-slate-500"><InlineCode>database</InlineCode></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Database Connection">
        <p>The <InlineCode>DATABASE_URL</InlineCode> should follow the PostgreSQL connection string format:</p>
        <CodeBlock>{`DATABASE_URL=postgres://user:password@localhost:5432/mydb`}</CodeBlock>
        <p>The connection pool is configured with sensible defaults (min: 0, max: 10 connections). You can customize
        this in <InlineCode>src/core/db/client.ts</InlineCode>.</p>
      </Section>

      <Section title="Docker Setup">
        <p>For local development with Docker, use the provided <InlineCode>docker-compose.yml</InlineCode>:</p>
        <CodeBlock>{`docker compose up -d
npm run dev`}</CodeBlock>
        <p>This starts a PostgreSQL instance on port 5432. The database name is <InlineCode>nextforge</InlineCode>
        and the default credentials are configured in the compose file.</p>

        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Note:</strong> The Docker setup is intended for development only. For production,
          use a managed PostgreSQL service or configure Docker with persistent volumes and proper secrets.
        </div>
      </Section>

      <Section title="Troubleshooting">
        <h3 className="text-lg font-semibold text-slate-900">&ldquo;DATABASE_URL is required&rdquo;</h3>
        <p>Ensure you've copied <InlineCode>.env.example</InlineCode> to <InlineCode>.env</InlineCode> and set a valid
        PostgreSQL connection string.</p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">&ldquo;Cannot connect to database&rdquo;</h3>
        <p>Verify PostgreSQL is running: <InlineCode>pg_isready</InlineCode>. Check that the database and user exist
        and that the connection URL is correct.</p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Port conflict on 3000</h3>
        <p>Set the <InlineCode>PORT</InlineCode> environment variable to use a different port, or kill the process
        currently using port 3000.</p>
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
