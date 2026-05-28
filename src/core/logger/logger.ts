import { config } from "@/core/config/env";

type LogContext = Record<string, unknown>;

const levels = ["trace", "debug", "info", "warn", "error"] as const;
type LogLevel = (typeof levels)[number];

function shouldLog(level: LogLevel) {
  return levels.indexOf(level) >= levels.indexOf(config.logLevel);
}

function write(level: LogLevel, message: string, context: LogContext = {}) {
  if (!shouldLog(level)) return;

  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...context
  };

  const line = JSON.stringify(entry);
  level === "error" || level === "warn" ? console.error(line) : console.log(line);
}

export const logger = {
  trace: (message: string, context?: LogContext) => write("trace", message, context),
  debug: (message: string, context?: LogContext) => write("debug", message, context),
  info: (message: string, context?: LogContext) => write("info", message, context),
  warn: (message: string, context?: LogContext) => write("warn", message, context),
  error: (message: string, context?: LogContext) => write("error", message, context)
};
