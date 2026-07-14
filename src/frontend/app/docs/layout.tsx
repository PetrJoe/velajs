"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { Menu, X, BookOpen, Ship, Terminal, Puzzle, Lock, Database, Palette, Shield, Cpu, FlaskConical, Rocket, Code2, ChevronRight, Search, ExternalLink } from "lucide-react";

interface SidebarLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  keywords?: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs/getting-started", label: "Overview", icon: <BookOpen className="size-3.5" />, keywords: "quick start new project setup create scaffold" },
      { href: "/docs/installation", label: "Installation", icon: <Ship className="size-3.5" />, keywords: "install prerequisites requirements docker setup env configure" },
      { href: "/docs/architecture", label: "Architecture", icon: <Puzzle className="size-3.5" />, keywords: "structure modular monolith project layout design decisions" },
    ],
  },
  {
    title: "Core Reference",
    links: [
      { href: "/docs/cli", label: "CLI Reference", icon: <Terminal className="size-3.5" />, keywords: "command line interface make generate scaffold resource" },
      { href: "/docs/api-reference", label: "API Reference", icon: <Code2 className="size-3.5" />, keywords: "api reference base repository config logger cache types" },
      { href: "/docs/api-layer", label: "API Layer", icon: <Cpu className="size-3.5" />, keywords: "response envelope cors csrf rate limiting validation middleware" },
      { href: "/docs/authentication", label: "Authentication", icon: <Lock className="size-3.5" />, keywords: "auth login register password hashing session token cookie" },
      { href: "/docs/database", label: "Database", icon: <Database className="size-3.5" />, keywords: "db knex postgresql migration repository query pagination" },
    ],
  },
  {
    title: "Advanced",
    links: [
      { href: "/docs/security", label: "Security", icon: <Shield className="size-3.5" />, keywords: "headers csp rbac permission csrf rate limit protection" },
      { href: "/docs/frontend", label: "Frontend", icon: <Palette className="size-3.5" />, keywords: "ui components layout dark mode design tokens tailwind" },
      { href: "/docs/jobs", label: "Jobs & Queues", icon: <Cpu className="size-3.5" />, keywords: "background job queue worker async processing retry" },
      { href: "/docs/testing", label: "Testing", icon: <FlaskConical className="size-3.5" />, keywords: "vitest test unit integration component mock" },
      { href: "/docs/deployment", label: "Deployment", icon: <Rocket className="size-3.5" />, keywords: "deploy docker vercel flyio railway production ci cd" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/docs/contributing", label: "Contributing", icon: <Code2 className="size-3.5" />, keywords: "contribute pull request code style development setup" },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K or Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Filtered sections based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sidebarSections;

    const q = searchQuery.toLowerCase().trim();
    return sidebarSections
      .map((section) => ({
        ...section,
        links: section.links.filter(
          (link) =>
            link.label.toLowerCase().includes(q) ||
            link.keywords?.toLowerCase().includes(q) ||
            link.href.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.links.length > 0);
  }, [searchQuery]);

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
              <span className="text-slate-900">nexar</span>
            </Link>
            <span className="hidden text-sm text-slate-400 sm:inline">/</span>
            <span className="hidden items-center gap-1.5 text-sm font-medium text-slate-600 sm:inline-flex">
              <BookOpen className="size-3.5" />
              Docs
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSidebarOpen(true);
                // Focus search after sidebar animation completes
                setTimeout(() => searchInputRef.current?.focus(), 300);
              }}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-700 sm:flex"
            >
              <Search className="size-3.5" />
              <span>Search docs...</span>
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                ⌘K
              </kbd>
            </button>
            <a
              href="https://github.com/nexar/nexar"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
              aria-label="GitHub"
            >
              <ExternalLink className="size-4" />
            </a>
            <Link
              href="/"
              className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar - sticky on desktop */}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-slate-200 bg-white transition-transform duration-200",
              "lg:sticky lg:top-16 lg:z-auto lg:block lg:w-60 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:border-r-0 lg:overflow-y-auto",
              sidebarOpen && "translate-x-0 shadow-xl"
            )}
          >
            {/* Search in sidebar */}
            <div className="sticky top-0 z-10 bg-white pb-3 pt-6 lg:pt-8">
              <div ref={searchRef} className="relative px-3">
                <Search className="pointer-events-none absolute left-5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}

                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-1 focus:ring-slate-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="px-3 pb-8">
              {filteredSections.length > 0 ? (
                <div className="space-y-5">
                  {filteredSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {section.title}
                      </h3>
                      <ul className="space-y-0.5">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href as any}
                              onClick={() => {
                                setSidebarOpen(false);
                                setSearchQuery("");
                              }}
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
                              <span className="truncate">{link.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-8 text-center">
                  <Search className="mx-auto size-8 text-slate-300" />
                  <p className="mt-2 text-sm font-medium text-slate-600">No results found</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try a different search term
                  </p>
                </div>
              )}
            </nav>

            {/* Need help section */}
            {!searchQuery && (
              <div className="sticky bottom-0 border-t border-slate-100 bg-white px-3 py-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-600">Need help?</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Open an issue on{" "}
                    <a href="https://github.com/nexar/nexar" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 underline">
                      GitHub
                    </a>.
                  </p>
                </div>
              </div>
            )}
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="min-w-0 flex-1 py-8 lg:py-10">
            <div className="max-w-4xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
