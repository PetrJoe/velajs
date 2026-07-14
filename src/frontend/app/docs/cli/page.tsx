export default function CliPage() {
  const commands = [
    {
      name: "make:app <name>",
      description: "Scaffold a new domain module with all subdirectories",
    },
    {
      name: "make:resource <name>",
      description: "Generate full CRUD: controller, routes, service, repository, validators, types, UI, tests, and migration",
    },
    {
      name: "make:migration <name>",
      description: "Create a new database migration file with timestamp prefix",
    },
    {
      name: "make:controller <name>",
      description: "Generate a controller file for an existing app",
    },
    {
      name: "make:service <name>",
      description: "Generate a service file for an existing app",
    },
    {
      name: "make:model <name>",
      description: "Generate a model/repository file for an existing app",
    },
    {
      name: "make:validator <name>",
      description: "Generate a Zod validator for an existing app",
    },
    {
      name: "make:test <name>",
      description: "Generate a test file for an existing app",
    },
    {
      name: "make:ui <name>",
      description: "Generate a UI component for an existing app",
    },
    {
      name: "make:middleware",
      description: "Generate a custom middleware",
    },
    {
      name: "make:plugin",
      description: "Generate a plugin stub",
    },
  ];

  return (
    <div className="py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">CLI Reference</h1>
      <p className="mt-3 text-lg text-slate-600">
        Vela ships with a powerful scaffolding CLI to accelerate development.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Usage</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`npm run make:app <name>   # Scaffold a new module
npm run make:resource <name>  # Generate full CRUD`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Commands</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Command</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {commands.map((cmd) => (
              <tr key={cmd.name}>
                <td className="px-4 py-3 font-mono text-sm text-slate-800">{cmd.name}</td>
                <td className="px-4 py-3 text-slate-600">{cmd.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Database commands</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`npm run db:migrate   # Run pending migrations
npm run db:rollback  # Rollback last migration batch
npm run db:seed      # Run database seeds`}</code>
      </pre>
    </div>
  );
}
