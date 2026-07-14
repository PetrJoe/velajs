export default function ContributingPage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Contributing</h1>
      <p className="mt-3 text-lg text-slate-600">
        We welcome contributions from the community.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Development setup</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`git clone https://github.com/velajs/vela.git
cd vela
npm install
cp .env.example .env
npm run db:migrate
npm run dev`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Code style</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-7 text-slate-600">
        <li>TypeScript strict mode — no <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">any</code> unless absolutely necessary</li>
        <li>ESLint and Prettier configurations are included — run <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">npm run lint</code> before committing</li>
        <li>Write tests for all new features and bug fixes</li>
        <li>Follow the existing module structure when adding new apps</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Testing</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
        <code>{`npm run test         # Run all tests
npm run typecheck    # TypeScript type checking`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Pull request checklist</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-7 text-slate-600">
        <li>Branch from <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">main</code> and keep PRs focused on a single concern</li>
        <li>Include tests for new functionality</li>
        <li>Update documentation if public APIs change</li>
        <li>Ensure all CI checks pass (lint, typecheck, test, build)</li>
      </ul>
    </div>
  );
}
