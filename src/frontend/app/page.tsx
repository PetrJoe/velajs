import { AppShell } from "@/frontend/layouts/AppShell";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const features = [
  "Modular apps",
  "Knex migrations",
  "Zod validation",
  "Tailwind UI primitives",
  "CLI generators",
  "Secure defaults"
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="nf-page space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-700 dark:text-brand-300">Next.js-first framework starter</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-ink-900 dark:text-white sm:text-5xl">
              Django-inspired fullstack development, TypeScript-native.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-ink-500 dark:text-slate-300">
              Build modular apps with explicit backend layers, PostgreSQL migrations, visible generated code, and a Tailwind-powered interface from the first commit.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button>Open dashboard</Button>
              <Button variant="secondary">Generate app</Button>
            </div>
          </div>
          <Card className="grid gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center justify-between rounded border border-slate-100 px-3 py-2 text-sm dark:border-slate-800">
                <span>{feature}</span>
                <span className="text-brand-600">Ready</span>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
