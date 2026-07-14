import type { ReactNode } from "react";
import Link from "next/link";

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
}

const sidebarLinks: SidebarLink[] = [
  { href: "/dashboard", label: "Overview", icon: "◇" },
  { href: "#", label: "Projects", icon: "□" },
  { href: "#", label: "Users", icon: "○" },
  { href: "#", label: "Settings", icon: "△" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-[#f7f8fb] lg:grid-cols-[16rem_1fr]">
      <aside className="border-r border-slate-200 bg-white p-4">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-[13px] text-white shadow-sm">V</span>
            <span>velajs</span>
          </Link>
        </div>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href as any}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <span className="text-slate-400">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6 lg:p-8">{children}</main>
    </div>
  );
}
