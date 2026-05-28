import type { Knex } from "knex";
import { config } from "./src/core/config/env";

const knexConfig: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: config.databaseUrl,
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts"
    },
    seeds: {
      directory: "./src/database/seeds",
      extension: "ts"
    }
  },
  production: {
    client: "pg",
    connection: config.databaseUrl,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts"
    }
  }
};

export default knexConfig;
