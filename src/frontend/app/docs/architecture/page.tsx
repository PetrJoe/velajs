export default function ArchitecturePage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Architecture</h1>
      <p className="mt-3 text-lg text-slate-600">
        Vela follows a modular monolith architecture with clear separation of concerns.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Project structure</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`src/
  apps/           # Domain modules (users, billing, etc.)
  core/           # Framework core (auth, db, config, jobs, security)
  database/       # Migrations, seeds, factories
  frontend/       # Next.js App Router pages and components
  shared/         # Shared UI, utils, types, validators
  cli/            # Scaffolding CLI
  tests/          # Test setup`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Module system</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Each domain module (app) follows a consistent structure:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`apps/orders/
  controllers/    # Request handling
  services/       # Business logic
  repositories/   # Data access
  validators/     # Zod schemas
  types/          # TypeScript types
  ui/             # React components
  pages/          # Next.js pages (optional)
  routes/         # API routes (optional)
  migrations/     # App-specific migrations
  tests/          # App-specific tests`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Data flow</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Requests flow through the following layers:
      </p>
      <ol className="mt-4 list-inside list-decimal space-y-2 text-base leading-7 text-slate-600">
        <li><strong className="text-slate-950">Next.js App Router</strong> routes the request</li>
        <li><strong className="text-slate-950">Middleware</strong> applies security headers, rate limiting</li>
        <li><strong className="text-slate-950">Controller</strong> validates input and calls the service</li>
        <li><strong className="text-slate-950">Service</strong> orchestrates business logic</li>
        <li><strong className="text-slate-950">Repository</strong> interacts with the database</li>
        <li><strong className="text-slate-950">Response</strong> is returned through the API envelope</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Key decisions</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-7 text-slate-600">
        <li><strong className="text-slate-950">Knex</strong> over ORM for explicit SQL control and migration workflow</li>
        <li><strong className="text-slate-950">Zod</strong> for runtime validation on both client and server</li>
        <li><strong className="text-slate-950">Handlebars</strong> for CLI template generation with zero runtime cost in production</li>
        <li><strong className="text-slate-950">Tailwind CSS</strong> v4 for utility-first styling with design tokens</li>
      </ul>
    </div>
  );
}
