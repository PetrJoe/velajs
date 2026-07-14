"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export function Tabs({ tabs, defaultTab, className, tabClassName, contentClassName }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn("flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/40", tabClassName)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white"
                : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={cn(contentClassName)}>
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
