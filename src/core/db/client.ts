import knex, { type Knex } from "knex";
import { config } from "@/core/config/env";

let connection: Knex | undefined;

export function db(): Knex {
  if (!connection) {
    connection = knex({
      client: "pg",
      connection: config.databaseUrl,
      pool: { min: 0, max: 10 }
    });
  }

  return connection;
}

export async function transaction<T>(callback: (trx: Knex.Transaction) => Promise<T>) {
  return db().transaction(callback);
}
