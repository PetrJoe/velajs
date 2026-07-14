import { Terminal, FileCode, Database, Plus, Trash2, Box, GitBranch, Wrench } from "lucide-react";

const commands = [
  {
    name: "make:app",
    syntax: "npm run make:app <name>",
    description: "Scaffold a new domain module with all subdirectories (controllers, services, repositories, validators, types, ui, tests, etc.)",
    icon: <Box className="size-4" />,
  },
  {
    name: "make:resource",
    syntax: "npm run make:resource <name>",
    description: "Generate a full CRUD resource: controller, service, repository, validators, types, UI components, tests, and database migration",
    icon: <Plus className="size-4" />,
  },
  {
    name: "make:migration",
    syntax: "npm run make:migration <name>",
    description: "Create a new database migration file with an auto-generated timestamp prefix",
    icon: <Database className="size-4" />,
  },
  {
    name: "make:controller",
    syntax: "npm run make:controller <name>",
    description: "Generate a controller file for an existing app module",
    icon: <FileCode className="size-4" />,
  },
  {
    name: "make:service",
    syntax: "npm run make:service <name>",
    description: "Generate a service file for an existing app module",
    icon: <GitBranch className="size-4" />,
  },
  {
    name: "make:model",
    syntax: "npm run make:model <name>",
    description: "Generate a repository/model file for an existing app module",
    icon: <Database className="size-4" />,
  },
  {
    name: "make:validator",
    syntax: "npm run make:validator <name>",
    description: "Generate a Zod validation schema for an existing app module",
    icon: <Wrench className="size-4" />,
  },
  {
    name: "make:test",
    syntax: "npm run make:test <name>",
    description: "Generate a test file for an existing app module",
    icon: <FileCode className="size-4" />,
  },
  {
    name: "make:ui",
    syntax: "npm run make:ui <name>",
    description: "Generate a UI component for an existing app module",
    icon: <Box className="size-4" />,
  },
  {
    name: "make:middleware",
    syntax: "npm run make:middleware",
    description: "Generate a custom middleware stub",
    icon: <Plus className="size-4" />,
  },
  {
    name: "make:plugin",
    syntax: "npm run make:plugin",
    description: "Generate a plugin definition stub",
    icon: <Wrench className="size-4" />,
  },
];

const dbCommands = [
  { command: "npm run db:migrate", description: "Run all pending database migrations" },
  { command: "npm run db:rollback", description: "Roll back the last batch of migrations" },
  { command: "npm run db:seed", description: "Run database seed files" },
];

const devCommands = [
  { command: "npm run dev", description: "Start the Next.js development server with HMR" },
  { command: "npm run build", description: "Build the application for production" },
  { command: "npm run start", description: "Start the production server" },
  { command: "npm run lint", description: "Run ESLint on the codebase" },
  { command: "npm run typecheck", description: "Run TypeScript type checking" },
  { command: "npm test", description: "Run the test suite with Vitest" },
];

export default function CliPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-amber-500" />
        CLI Reference
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">CLI Reference</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        velajs ships with a powerful scaffolding CLI that accelerates development by generating
        consistent, type-safe code following framework conventions.
      </p>

      <Section title="Usage">
        <p>All commands are run through npm scripts:</p>
        <CodeBlock>{`npm run make:app users       # Scaffold a new module
npm run make:resource posts   # Generate full CRUD
npm run make:migration        # Create a migration
npm run make:ui Button        # Generate a UI component`}</CodeBlock>
        <p className="text-sm text-slate-500">Commands are also available directly via <InlineCode>tsx src/cli/index.ts</InlineCode>.</p>
      </Section>

      <Section title="Scaffolding Commands">
        <div className="mt-4 space-y-3">
          {commands.map((cmd) => (
            <div key={cmd.name} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                  {cmd.icon}
                </span>
                <div>
                  <code className="font-mono text-sm font-semibold text-slate-900">{cmd.syntax}</code>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{cmd.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Database Commands">
        <div className="mt-4 space-y-2">
          {dbCommands.map(({ command, description }) => (
            <div key={command} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
              <code className="shrink-0 font-mono text-sm text-slate-800">{command}</code>
              <p className="text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Development Commands">
        <div className="mt-4 space-y-2">
          {devCommands.map(({ command, description }) => (
            <div key={command} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
              <code className="shrink-0 font-mono text-sm text-slate-800">{command}</code>
              <p className="text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Creating a Module Example">
        <p>Let&apos;s walk through creating a complete <InlineCode>products</InlineCode> module:</p>
        <CodeBlock>{`# 1. Scaffold the module
npm run make:app products

# 2. Create a migration
npm run make:migration create_products_table

# 3. Run the migration
npm run db:migrate

# 4. The module structure is ready:
src/apps/products/
  controllers/
  services/
  repositories/
  validators/
  types/
  ui/
  tests/`}</CodeBlock>
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
