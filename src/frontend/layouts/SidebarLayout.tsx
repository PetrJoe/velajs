import type { ReactNode } from "react";

export function SidebarLayout({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid-cols-[16rem_1fr]">
      <aside className="border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
