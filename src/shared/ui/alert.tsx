import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export function Alert({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100", className)} {...props} />;
}
