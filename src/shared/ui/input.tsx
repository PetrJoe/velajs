import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded border border-slate-300 bg-white px-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-brand-900",
        className
      )}
      {...props}
    />
  );
}
