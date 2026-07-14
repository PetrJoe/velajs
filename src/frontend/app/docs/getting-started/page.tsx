export default function GettingStartedPage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Getting Started</h1>

      <div className="mt-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
        Prerequisites: Node.js 20+, npm 9+, and PostgreSQL 15+ running locally or remotely.
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Create a new project</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`npx velajs create my-app
cd my-app
npm install`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Configure environment</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Copy the example environment file and update the values for your local setup.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`cp .env.example .env`}</code>
      </pre>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Open <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">.env</code> and set your
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">DATABASE_URL</code> to point to your PostgreSQL instance.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Run database migrations</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`npm run db:migrate
npm run db:seed`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Start the dev server</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`npm run dev`}</code>
      </pre>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Your app will be running at <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">http://localhost:3000</code>.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Next steps</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-7 text-slate-600">
        <li>Generate your first module: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">npm run make:app blog</code></li>
        <li>Create a migration: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">npm run make:migration create_posts_table</code></li>
        <li>Explore the <a href="/docs/architecture" className="font-medium text-slate-950 underline">architecture docs</a></li>
      </ul>
    </div>
  );
}
