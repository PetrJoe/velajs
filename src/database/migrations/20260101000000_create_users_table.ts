import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('create extension if not exists "pgcrypto"');
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("email").notNullable().unique();
    table.string("name").notNullable();
    table.string("role").notNullable().defaultTo("member");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
