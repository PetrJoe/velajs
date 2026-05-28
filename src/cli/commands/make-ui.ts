import { join } from "node:path";
import { writeTemplate } from "@/cli/utils/files";
import { pascalCase } from "@/cli/utils/string";

export async function makeUi(name: string) {
  if (!name) throw new Error("Usage: npm run make:ui <name>");

  const component = pascalCase(name);
  await writeTemplate(
    join(process.cwd(), "src/shared/ui", `${name}.tsx`),
    `import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export function {{component}}({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950", className)} {...props} />;
}
`,
    { component }
  );

  console.log(`Created UI component: ${component}`);
}
