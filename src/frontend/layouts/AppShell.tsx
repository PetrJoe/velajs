import type { ReactNode } from "react";

const navItems = ["Dashboard", "Apps", "Admin", "Jobs", "Settings"];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-semibold text-ink-900 dark:text-white">vorajs</div>
          <nav className="hidden gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item} className="rounded px-3 py-2 text-sm text-ink-500 hover:bg-slate-100 hover:text-ink-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" href="#">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
