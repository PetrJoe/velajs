"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

interface SidebarLink {
  href: string;
  label: string;
}

const sidebarSections = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs/getting-started", label: "Overview" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/architecture", label: "Architecture" },
    ] as SidebarLink[],
  },
  {
    title: "Reference",
    links: [
      { href: "/docs/cli", label: "CLI Reference" },
      { href: "/docs/api-reference", label: "API Reference" },
    ] as SidebarLink[],
  },
  {
    title: "Community",
    links: [
      { href: "/docs/contributing", label: "Contributing" },
    ] as SidebarLink[],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fb]">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
              <span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-[13px] text-white shadow-sm">V</span>
              <span>nextforge</span>
            </Link>
            <span className="hidden text-sm text-slate-400 sm:inline">/</span>
            <span className="hidden text-sm font-medium text-slate-600 sm:inline">Docs</span>
          </div>
          <Link
            href="/"
            className="rounded-md px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-slate-200 bg-white p-6 pt-20 transition-transform duration-200 lg:static lg:z-auto lg:block lg:w-56 lg:translate-x-0 lg:border-r-0 lg:p-0 lg:pt-8",
              sidebarOpen && "translate-x-0 shadow-xl"
            )}
          >
            <nav className="space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href as any}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm font-medium transition",
                            pathname === link.href
                              ? "bg-slate-950 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <main className="min-w-0 flex-1">
            <div className="prose prose-slate max-w-none">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
