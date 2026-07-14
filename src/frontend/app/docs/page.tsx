import Link from "next/link";

const docCards = [
  {
    title: "Getting Started",
    description: "Learn how to create and set up a new Vela project from scratch.",
    href: "/docs/getting-started",
  },
  {
    title: "Installation",
    description: "Prerequisites, environment setup, and configuration options.",
    href: "/docs/installation",
  },
  {
    title: "Architecture",
    description: "Understand the project structure, module system, and design decisions.",
    href: "/docs/architecture",
  },
  {
    title: "CLI Reference",
    description: "Full documentation for the scaffolding CLI and all make commands.",
    href: "/docs/cli",
  },
  {
    title: "API Reference",
    description: "Auto-generated API documentation for the core framework.",
    href: "/docs/api-reference",
  },
  {
    title: "Contributing",
    description: "Guidelines for contributing to Vela and the community.",
    href: "/docs/contributing",
  },
];

export default function DocsPage() {
  return (
    <div className="py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Documentation</h1>
        <p className="mt-3 text-lg text-slate-600">
          Everything you need to build with Vela, from getting started to advanced patterns.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {docCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-950 group-hover:text-slate-700">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-slate-950">Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
