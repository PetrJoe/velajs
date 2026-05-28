import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950", className)} {...props} />;
}
