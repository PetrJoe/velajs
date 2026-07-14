import { AppShell } from "@/frontend/layouts/AppShell";
import { Card } from "@/shared/ui/card";
import Link from "next/link";

const examples: { title: string; description: string; href: string }[] = [
  {
    title: "Todo App",
    description: "A complete CRUD todo application with users, authentication, and persistence.",
    href: "#",
  },
  {
    title: "Blog Platform",
    description: "Multi-author blog with posts, categories, comments, and markdown support.",
    href: "#",
  },
  {
    title: "SaaS Starter",
    description: "Subscription management, team accounts, billing, and role-based access.",
    href: "#",
  },
];

export default function ShowcasePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Examples &amp; Templates</h1>
        <p className="mt-3 text-lg text-slate-600">
          Ready-to-use example applications built with velajs.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Link key={example.title} href={example.href as any}>
              <Card className="h-full transition hover:shadow-md">
                <h2 className="text-lg font-semibold text-slate-950">{example.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{example.description}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Want to showcase your project?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Submit a PR to add your velajs-powered project to this page.
          </p>
          <Link
            href={"/docs/contributing" as any}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Learn how to contribute
          </Link>
        </div>
      </main>
    </AppShell>
  );
}
