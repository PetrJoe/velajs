"use client";

import { cn } from "@/shared/utils/cn";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Switch({ checked, onChange, disabled, label, className }: SwitchProps) {
  return (
    <label className={cn("flex items-center gap-3", disabled && "pointer-events-none opacity-50", className)}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          checked ? "bg-brand-500" : "bg-slate-300 dark:bg-slate-700"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block size-4 translate-y-0 rounded-full bg-white shadow ring-0 transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
}
