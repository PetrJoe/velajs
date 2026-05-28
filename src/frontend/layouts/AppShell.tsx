import type { ReactNode } from "react";

const navItems = ["Framework", "CLI", "Database", "Docs"];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-[13px] text-white shadow-sm">V</span>
            <span>velajs</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item} href="#" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#" className="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:inline-flex">
              GitHub
            </a>
            <a href="#" className="rounded-md bg-slate-950 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
              Deploy
            </a>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
