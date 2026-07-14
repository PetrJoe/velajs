import { AppShell } from "@/frontend/layouts/AppShell";

export default function AboutPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">About nexar</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          nexar is a fullstack starter kit built on Next.js, Knex, PostgreSQL, Zod, and Tailwind CSS.
          It provides structure, generators, and production-ready conventions for serious Next.js projects.
          Built from the ground up as a modular monolith, it ships with a CLI, auth system, database layer, and UI primitives ready to go.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-slate-950">Why nexar?</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Every team eventually builds scaffolding around their Next.js projects — CLI generators, database layers,
          auth setup, UI primitives, and deployment config. nexar does this from day one, so you can focus on
          building features instead of wiring up infrastructure.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-slate-950">Principles</h2>
        <ul className="mt-4 list-inside list-disc space-y-3 text-base leading-7 text-slate-600">
          <li><strong className="text-slate-950">Convention over configuration</strong> — predictable structure that scales across teams</li>
          <li><strong className="text-slate-950">SQL visibility</strong> — Knex keeps database interactions explicit and debuggable</li>
          <li><strong className="text-slate-950">Type-safe end to end</strong> — Zod and TypeScript enforce contracts everywhere</li>
          <li><strong className="text-slate-950">Generator-friendly</strong> — the CLI scaffolds code but never hides it from you</li>
        </ul>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-slate-950">License</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          nexar is open source and available under the MIT license.
        </p>
      </main>
    </AppShell>
  );
}
