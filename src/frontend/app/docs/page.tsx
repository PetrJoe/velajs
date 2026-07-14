import Link from "next/link";
import { BookOpen, Terminal, Cpu, Lock, Database, Palette, Shield, FlaskConical, Rocket, Code2, ArrowRight, ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    description: "Learn the fundamentals and set up your first nextforge project.",
    links: [
      { label: "Quick Start", href: "/docs/getting-started", desc: "Create and run a new project in minutes" },
      { label: "Installation", href: "/docs/installation", desc: "Prerequisites, env setup, Docker configuration" },
      { label: "Architecture", href: "/docs/architecture", desc: "Project structure, module system, design decisions" },
    ],
  },
  {
    title: "Core Reference",
    description: "Deep documentation for every framework module.",
    links: [
      { label: "CLI Reference", href: "/docs/cli", desc: "All scaffolding commands, options, and workflows" },
      { label: "API Reference", href: "/docs/api-reference", desc: "Complete API docs for repositories, config, logger, cache" },
      { label: "API Layer", href: "/docs/api-layer", desc: "Response envelope, CORS, CSRF, rate limiting, validation" },
      { label: "Authentication", href: "/docs/authentication", desc: "Password hashing, sessions, tokens, auth API routes" },
      { label: "Database", href: "/docs/database", desc: "Knex setup, repositories, migrations, pagination" },
    ],
  },
  {
    title: "Advanced Guides",
    description: "Production patterns, security, and deployment.",
    links: [
      { label: "Security", href: "/docs/security", desc: "Headers, CSP, RBAC, CSRF, rate limiting" },
      { label: "Frontend", href: "/docs/frontend", desc: "UI components, layouts, dark mode, design tokens" },
      { label: "Jobs & Queues", href: "/docs/jobs", desc: "Background processing, job definitions, worker setup" },
      { label: "Testing", href: "/docs/testing", desc: "Vitest setup, integration tests, test helpers" },
      { label: "Deployment", href: "/docs/deployment", desc: "Docker, CI/CD, Vercel, Fly.io, production config" },
    ],
  },
  {
    title: "Community",
    description: "Get involved and contribute to nextforge.",
    links: [
      { label: "Contributing", href: "/docs/contributing", desc: "Development setup, code style, PR checklist" },
    ],
  },
];

const quickLinks = [
  { label: "Quick Start", href: "/docs/getting-started", icon: <BookOpen className="size-4" />, color: "bg-emerald-500" },
  { label: "CLI Commands", href: "/docs/cli", icon: <Terminal className="size-4" />, color: "bg-sky-500" },
  { label: "API Reference", href: "/docs/api-reference", icon: <Code2 className="size-4" />, color: "bg-violet-500" },
  { label: "Deployment", href: "/docs/deployment", icon: <Rocket className="size-4" />, color: "bg-amber-500" },
];

export default function DocsPage() {
  return (
    <div className="py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500" />
          nextforge v0.2.7 Documentation
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
          Build enterprise Next.js applications
        </h1>
        <p className="mt-3 text-lg text-slate-600 max-w-2xl">
          Everything you need to build with nextforge — from getting started to advanced patterns,
          security, deployment, and contribution guidelines.
        </p>
      </div>

      {/* Quick links */}
      <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href as any}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
          >
            <span className={cn("flex size-10 items-center justify-center rounded-lg text-white shadow-sm", link.color)}>
              {link.icon}
            </span>
            <div className="flex-1">
              <span className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">{link.label}</span>
            </div>
            <ChevronRight className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
          </Link>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{section.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{section.description}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-700">
                    {link.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-5 text-slate-600">{link.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-slate-700">
                    Read more <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
