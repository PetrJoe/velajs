import { logger } from "@/core/logger/logger";

logger.info("Worker process started", {
  adapter: process.env.JOB_QUEUE_ADAPTER ?? "database"
});
