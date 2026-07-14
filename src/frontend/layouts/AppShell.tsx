"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { Menu, X, ExternalLink, Moon, Sun, ChevronRight } from "lucide-react";

const navItems: { label: string; href: string }[] = [
  { label: "Docs", href: "/docs" },
  { label: "Architecture", href: "/docs/architecture" },
  { label: "CLI", href: "/docs/cli" },
  { label: "Showcase", href: "/showcase" },
];

const footerLinks: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Documentation",
    links: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Architecture", href: "/docs/architecture" },
      { label: "CLI Reference", href: "/docs/cli" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Contributing", href: "/docs/contributing" },
      { label: "Showcase", href: "/showcase" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "About", href: "/about" },
      { label: "API Reference", href: "/docs/api-reference" },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="min-h-screen bg-surface text-ink-900 dark:bg-ink-950 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 text-sm font-bold text-white shadow-sm dark:from-white dark:to-slate-300 dark:text-ink-900 transition-transform group-hover:scale-105">
              N
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold tracking-tight">nexar</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-widest text-ink-400 sm:inline">v0.2.7</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-white"
                    : "text-ink-500 hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800/50 dark:hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="rounded-lg p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <a
              href="https://github.com/nexar/nexar"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 sm:inline-flex dark:hover:bg-ink-800 dark:hover:text-white"
              aria-label="GitHub"
            >
              <ExternalLink className="size-4" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 md:hidden dark:hover:bg-ink-800 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-72 max-w-full border-l border-border bg-white p-6 shadow-xl dark:bg-ink-950 animate-slide-down">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-semibold">Navigation</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800">
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-white"
                      : "text-ink-500 hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-white"
                  )}
                >
                  {item.label}
                  <ChevronRight className="size-3.5 opacity-40" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      {children}

      {/* Footer */}
      <footer className="border-t border-border bg-white dark:bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-ink-900 text-xs font-bold text-white dark:bg-white dark:text-ink-900">
                  N
                </span>
                <span className="text-sm font-semibold">nexar</span>
              </Link>
              <p className="mt-3 text-xs leading-5 text-ink-500">
                TypeScript-first fullstack framework for Next.js, PostgreSQL, and modern web applications.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a href="https://github.com/nexar/nexar" target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-ink-900 dark:hover:text-white transition">
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>

            {/* Link groups */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href as any}
                        className="text-sm text-ink-500 transition hover:text-ink-900 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-ink-400">&copy; {new Date().getFullYear()} nexar. MIT License.</p>
            <div className="flex items-center gap-4 text-xs text-ink-400">
              <span>Built with Next.js</span>
              <span className="text-ink-300">&middot;</span>
              <span>v0.2.7</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
