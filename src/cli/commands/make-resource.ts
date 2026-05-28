import { join } from "node:path";
import { makeApp } from "@/cli/commands/make-app";
import { writeTemplate } from "@/cli/utils/files";
import { pascalCase, pluralize } from "@/cli/utils/string";

export async function makeResource(name: string) {
  if (!name) throw new Error("Usage: npm run make:resource <name>");

  const appName = pluralize(name.toLowerCase());
  const model = pascalCase(name.replace(/s$/, ""));
  const base = join(process.cwd(), "src/apps", appName);

  await makeApp(appName);
  await writeTemplate(
    join(base, "types", `${model.toLowerCase()}.ts`),
    `export type {{model}} = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
`,
    { model }
  );
  await writeTemplate(
    join(base, "validators", `${model.toLowerCase()}-validator.ts`),
    `import { z } from "zod";

export const create{{model}}Schema = z.object({
  name: z.string().min(1).max(120)
});

export const update{{model}}Schema = create{{model}}Schema.partial();
export type Create{{model}}Input = z.infer<typeof create{{model}}Schema>;
`,
    { model }
  );
  await writeTemplate(
    join(base, "ui", `${model}Card.tsx`),
    `import { Card } from "@/shared/ui/card";
import type { {{model}} } from "../types/{{lowerModel}}";

export function {{model}}Card({ item }: { item: {{model}} }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-ink-900 dark:text-white">{item.name}</h3>
    </Card>
  );
}
`,
    { model, lowerModel: model.toLowerCase() }
  );

  console.log(`Created resource: ${appName}`);
}
