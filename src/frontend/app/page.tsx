import { AppShell } from "@/frontend/layouts/AppShell";

const capabilities = [
  {
    title: "Modular apps",
    description: "Keep product domains isolated with controllers, services, repositories, validation, UI, and tests."
  },
  {
    title: "PostgreSQL workflow",
    description: "Use Knex migrations, seeds, transactions, pagination helpers, and typed repository boundaries."
  },
  {
    title: "Tailwind system",
    description: "Ship with restrained tokens, layout primitives, form controls, dark mode, and responsive defaults."
  },
  {
    title: "Generator CLI",
    description: "Scaffold apps, migrations, resources, validators, tests, and UI without hiding generated code."
  }
];

const layers = ["Next.js App Router", "Auth + RBAC", "Zod validation", "Knex repositories", "Jobs + plugins", "Observability"];

export default function HomePage() {
  return (
    <AppShell>
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:56px_56px] opacity-55" />
          <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white via-white/90 to-transparent" />

          <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
                <span className="size-2 rounded-full bg-emerald-500" />
                Production-grade Next.js starter
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Build enterprise apps with Next.js, faster.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Vela is a fullstack starter that brings structure, generators, PostgreSQL workflows, typed validation, and Tailwind UI conventions to serious Next.js projects.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="/docs/getting-started" className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                  Start a project
                </a>
                <a href="/docs/architecture" className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                  Explore architecture
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
                {[
                  ["100%", "TypeScript"],
                  ["SQL", "Visible"],
                  ["CLI", "Included"]
                ].map(([value, label]) => (
                  <div key={label} className="p-4">
                    <div className="text-lg font-semibold text-slate-950">{value}</div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-2 shadow-2xl shadow-slate-950/20">
              <div className="rounded-xl border border-white/10 bg-[#080b12]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-red-400" />
                    <span className="size-3 rounded-full bg-amber-400" />
                    <span className="size-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-500">vela workspace</span>
                </div>

                <div className="grid gap-3 p-5 font-mono text-sm">
                  <p className="text-slate-500">$ npm run make:resource billing</p>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-emerald-400">created src/apps/billing</p>
                    <p className="mt-2 text-slate-400">controllers services repositories validators ui tests</p>
                  </div>
                  <p className="text-slate-500">$ npm run make:migration create_invoices_table</p>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sky-300">migration ready</p>
                    <p className="mt-2 text-slate-400">src/database/migrations/20260528105610_create_invoices_table.ts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Framework surface</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Everything needed for a maintainable modular monolith.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">The starter gives teams a consistent layout for frontend, backend, database, security, background jobs, plugins, and observability without locking them into opaque abstractions.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <article key={capability.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-950">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{capability.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-6 sm:px-6 lg:px-8">
            {layers.map((layer) => (
              <span key={layer} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                {layer}
              </span>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
