import { db } from "@/core/db/client";

export async function healthCheck() {
  const startedAt = performance.now();
  await db().raw("select 1 as ok");

  return {
    status: "ok",
    database: "ok",
    durationMs: Math.round(performance.now() - startedAt),
    checkedAt: new Date().toISOString()
  };
}
