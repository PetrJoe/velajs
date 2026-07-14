export default function InstallationPage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Installation</h1>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Prerequisites</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-7 text-slate-600">
        <li>Node.js 20 or later</li>
        <li>npm 9 or later</li>
        <li>PostgreSQL 15 or later</li>
        <li>A package manager (npm, yarn, or pnpm)</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Quick start</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Use the CLI to scaffold a new project:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`npx velajs create my-project
cd my-project
npm install`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Environment variables</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        The following environment variables are required:
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
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
              <td className="px-4 py-3 font-mono text-slate-800">DATABASE_URL</td>
              <td className="px-4 py-3 text-slate-600">PostgreSQL connection string</td>
              <td className="px-4 py-3 text-slate-500">postgres://localhost:5432/vela</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-slate-800">NODE_ENV</td>
              <td className="px-4 py-3 text-slate-600">Environment mode</td>
              <td className="px-4 py-3 text-slate-500">development</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-slate-800">PORT</td>
              <td className="px-4 py-3 text-slate-600">Server port</td>
              <td className="px-4 py-3 text-slate-500">3000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Docker setup</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        For local development with Docker:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`docker compose up -d
npm run dev`}</code>
      </pre>
    </div>
  );
}
