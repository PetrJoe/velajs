import { join } from "node:path";
import { writeTemplate } from "@/cli/utils/files";

export async function makeMigration(name: string) {
  if (!name) throw new Error("Usage: npm run make:migration <name>");

  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  await writeTemplate(
    join(process.cwd(), "src/database/migrations", `${stamp}_${name}.ts`),
    `import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("{{tableName}}", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("{{tableName}}");
}
`,
    { tableName: name.replace(/^create_/, "").replace(/_table$/, "") }
  );

  console.log(`Created migration: ${name}`);
}
