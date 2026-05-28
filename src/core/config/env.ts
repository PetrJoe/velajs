import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(16),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error"]).default("info"),
  JOB_QUEUE_ADAPTER: z.enum(["database", "redis"]).default("database")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment: ${parsed.error.message}`);
}

export const config = {
  nodeEnv: parsed.data.NODE_ENV,
  appUrl: parsed.data.APP_URL,
  databaseUrl: parsed.data.DATABASE_URL,
  authSecret: parsed.data.AUTH_SECRET,
  logLevel: parsed.data.LOG_LEVEL,
  jobQueueAdapter: parsed.data.JOB_QUEUE_ADAPTER,
  isProduction: parsed.data.NODE_ENV === "production",
  isDevelopment: parsed.data.NODE_ENV === "development"
} as const;

export type AppConfig = typeof config;
