"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { Menu, X, BookOpen, Ship, Terminal, Puzzle, Lock, Database, Palette, Shield, Cpu, FlaskConical, Rocket, Code2, ChevronRight } from "lucide-react";

interface SidebarLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs/getting-started", label: "Overview", icon: <BookOpen className="size-3.5" /> },
      { href: "/docs/installation", label: "Installation", icon: <Ship className="size-3.5" /> },
      { href: "/docs/architecture", label: "Architecture", icon: <Puzzle className="size-3.5" /> },
    ],
  },
  {
    title: "Core Reference",
    links: [
      { href: "/docs/cli", label: "CLI Reference", icon: <Terminal className="size-3.5" /> },
      { href: "/docs/api-reference", label: "API Reference", icon: <Code2 className="size-3.5" /> },
      { href: "/docs/api-layer", label: "API Layer", icon: <Cpu className="size-3.5" /> },
      { href: "/docs/authentication", label: "Authentication", icon: <Lock className="size-3.5" /> },
      { href: "/docs/database", label: "Database", icon: <Database className="size-3.5" /> },
    ],
  },
  {
    title: "Advanced",
    links: [
      { href: "/docs/security", label: "Security", icon: <Shield className="size-3.5" /> },
      { href: "/docs/frontend", label: "Frontend", icon: <Palette className="size-3.5" /> },
      { href: "/docs/jobs", label: "Jobs & Queues", icon: <Cpu className="size-3.5" /> },
      { href: "/docs/testing", label: "Testing", icon: <FlaskConical className="size-3.5" /> },
      { href: "/docs/deployment", label: "Deployment", icon: <Rocket className="size-3.5" /> },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/docs/contributing", label: "Contributing", icon: <Code2 className="size-3.5" /> },
    ],
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
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 text-[13px] font-bold text-white shadow-sm">
                N
              </span>
              <span className="text-slate-900">nextforge</span>
            </Link>
            <span className="hidden text-sm text-slate-400 sm:inline">/</span>
            <span className="hidden items-center gap-1.5 text-sm font-medium text-slate-600 sm:inline-flex">
              <BookOpen className="size-3.5" />
              Docs
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/nextforge/nextforge"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
            >
              GitHub
            </a>
            <Link
              href="/"
              className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-slate-200 bg-white p-6 pt-20 transition-transform duration-200 lg:static lg:z-auto lg:block lg:w-60 lg:translate-x-0 lg:border-r-0 lg:p-0 lg:pt-8",
              sidebarOpen && "translate-x-0 shadow-xl"
            )}
          >
            <nav className="space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </h3>
                  <ul className="space-y-0.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href as any}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                            pathname === link.href
                              ? "bg-slate-900 text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          )}
                        >
                          <span className={cn(
                            "flex-shrink-0",
                            pathname === link.href ? "text-white" : "text-slate-400"
                          )}>
                            {link.icon}
                          </span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-600">Need help?</p>
              <p className="mt-1 text-xs text-slate-500">
                Open an issue on{" "}
                <a href="https://github.com/nextforge/nextforge" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 underline">
                  GitHub
                </a>
                {" "}or check the{" "}
                <a href="/docs/contributing" className="font-medium text-slate-900 underline">
                  contributing guide
                </a>.
              </p>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="min-w-0 flex-1">
            <div className="max-w-4xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
