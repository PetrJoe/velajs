import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").insert({
    email: "admin@example.com",
    name: "Admin User",
    role: "admin"
  }).onConflict("email").ignore();
}
