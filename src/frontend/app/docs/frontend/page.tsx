import { Palette, Layout, Sun, Moon, Box, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FrontendPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-pink-500" />
        Frontend
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Frontend</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        nextforge ships with a comprehensive UI component library, responsive layouts, dark mode support,
        and a design token system — all built with Tailwind CSS v4.
      </p>

      <Section title="Layouts">
        <p>The framework provides three pre-built layouts that cover common application patterns:</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "AppShell",
              desc: "Main application shell with sticky header, responsive mobile menu, dark mode toggle, and footer with link groups.",
              file: "@/frontend/layouts/AppShell",
            },
            {
              title: "AuthLayout",
              desc: "Centered single-column layout for login, registration, and password reset pages with background styling.",
              file: "@/frontend/layouts/AuthLayout",
            },
            {
              title: "SidebarLayout",
              desc: "Dashboard layout with collapsible sidebar navigation, main content area, and header.",
              file: "@/frontend/layouts/SidebarLayout",
            },
          ].map((layout) => (
            <div key={layout.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{layout.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{layout.desc}</p>
              <code className="mt-2 block text-xs text-slate-500">{layout.file}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="UI Components">
        <p>The <InlineCode>@/shared/ui/</InlineCode> directory contains production-ready, accessible components:</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Button", desc: "Primary, secondary, outline, ghost, and danger variants. Supports loading state and icon slots." },
            { name: "Card", desc: "Container component with optional header, footer, and hover effects. Used throughout docs and showcase." },
            { name: "Input", desc: "Form input with label, error state, placeholder, and focus ring styling." },
            { name: "Select", desc: "Dropdown select with placeholder, disabled state, and dark mode support." },
            { name: "Badge", desc: "Inline status indicators with color variants (success, warning, error, info)." },
            { name: "Alert", desc: "Contextual notification banners with dismissible option and icon support." },
            { name: "Dialog", desc: "Modal dialog with overlay, escape-to-close, click-outside-to-close. Includes DialogHeader, DialogTitle, DialogDescription, DialogFooter." },
            { name: "Dropdown", desc: "Menu dropdown with trigger, items, danger/disabled states, and icon support. Closes on outside click." },
            { name: "Tabs", desc: "Tabbed interface with active tab indicator and animated content transitions." },
            { name: "Toast", desc: "Context-based toast notifications with success, error, info, warning variants. Auto-dismisses after 4s." },
            { name: "Tooltip", desc: "Hover tooltip with top, bottom, left, right positioning. Appears on hover and focus." },
            { name: "Switch", desc: "Toggle switch with label, disabled state, and accessible aria attributes." },
            { name: "Skeleton", desc: "Loading placeholders. Includes SkeletonCard and SkeletonTable for common patterns." },
          ].map((comp) => (
            <div key={comp.name} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <h4 className="font-mono text-sm font-semibold text-slate-900">{comp.name}</h4>
              <p className="mt-1 text-xs leading-5 text-slate-600">{comp.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dark Mode">
        <p>Dark mode is built in and toggleable via the <InlineCode>AppShell</InlineCode> header button. It uses a <InlineCode>.dark</InlineCode> class on the <InlineCode>&lt;html&gt;</InlineCode> element:</p>

        <CodeBlock>{`// Toggle dark mode programmatically
document.documentElement.classList.toggle("dark");

// CSS custom properties update automatically
.dark {
  --color-surface: #020617;
  --color-border: #1e293b;
  --color-text: #f8fafc;
  --color-text-secondary: #94a3b8;
}`}</CodeBlock>

        <p className="mt-4">Dark mode can be persisted to localStorage for a persistent user preference:</p>
        <CodeBlock>{`// In your root layout or theme provider
const stored = localStorage.getItem("theme");
if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
}`}</CodeBlock>
      </Section>

      <Section title="Design Tokens">
        <p>The design system is defined in <InlineCode>src/frontend/design-system/tokens.ts</InlineCode>:</p>
        <CodeBlock>{`export const tokens = {
  radius: {
    sm: "rounded",
    md: "rounded-md",
  },
  spacing: {
    page: "px-4 sm:px-6 lg:px-8",
    stack: "space-y-4",
  },
  typography: {
    title: "text-2xl font-semibold tracking-normal text-ink-900 dark:text-white",
    body: "text-sm leading-6 text-ink-700 dark:text-slate-300",
  },
} as const;`}</CodeBlock>

        <p className="mt-4">CSS custom properties are defined in <InlineCode>globals.css</InlineCode> using the <InlineCode>@theme</InlineCode> directive:</p>
        <CodeBlock>{`@theme {
  --color-brand-50: #f0f9ff;
  --color-brand-500: #0ea5e9;
  --color-ink-50: #f8fafc;
  --color-ink-900: #0f172a;
  --color-surface: #f8fafc;
  --color-border: #e2e8f0;
  --font-sans: "Inter", "ui-sans-serif", "system-ui", "sans-serif";
}`}</CodeBlock>
      </Section>

      <Section title="Animations">
        <p>The framework includes utility CSS animations for common UI patterns:</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { class: "animate-fade-in", desc: "Simple opacity fade in (0.5s)" },
            { class: "animate-slide-up", desc: "Fade in with upward translation (0.5s)" },
            { class: "animate-slide-down", desc: "Fade in with downward translation (0.3s)" },
            { class: "animate-scale-in", desc: "Fade in with scale transform (0.2s)" },
            { class: "animate-shimmer", desc: "Loading shimmer effect (1.5s infinite)" },
            { class: "animate-stagger", desc: "Staggered children animation for lists" },
          ].map((anim) => (
            <div key={anim.class} className="rounded-lg border border-slate-200 bg-white p-3">
              <code className="font-mono text-sm font-semibold text-slate-900">{anim.class}</code>
              <p className="mt-0.5 text-xs text-slate-600">{anim.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Utility: cn()">
        <p>The <InlineCode>cn()</InlineCode> utility combines <InlineCode>clsx</InlineCode> and <InlineCode>tailwind-merge</InlineCode> for conditional class names with automatic conflict resolution:</p>
        <ApiBlock
          importPath="@/shared/utils/cn"
          exports={["cn"]}
        />
        <CodeBlock>{`import { cn } from "@/shared/utils/cn";

cn("px-4 py-2", isActive && "bg-blue-500", "px-6");
// → "py-2 bg-blue-500 px-6" (px-6 wins over px-4)`}</CodeBlock>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
      <code>{children}</code>
    </pre>
  );
}

function ApiBlock({ importPath, exports }: { importPath: string; exports: string[] }) {
  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium">Import:</span>
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-800">{importPath}</code>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium">Exports:</span>
        <span className="flex flex-wrap gap-1">
          {exports.map((exp) => (
            <code key={exp} className="rounded bg-white px-1.5 py-0.5 font-mono text-emerald-700">{exp}</code>
          ))}
        </span>
      </div>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">{children}</code>
  );
}
