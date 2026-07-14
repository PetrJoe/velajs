export default function ApiReferencePage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">API Reference</h1>
      <p className="mt-3 text-lg text-slate-600">
        Core framework APIs and modules.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">BaseRepository</h2>
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-base leading-7 text-slate-600">
          Generic repository class with built-in pagination, transactions, and CRUD operations.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-200">
          <code>{`import { BaseRepository } from "@/core/db/repository";

interface User {
  id: string;
  email: string;
  name: string;
}

class UserRepository extends BaseRepository<User> {
  constructor() {
    super({ tableName: "users" });
  }

  async findByEmail(email: string) {
    return this.db("users").where({ email }).first();
  }
}`}</code>
        </pre>
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">ApiError</h2>
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-base leading-7 text-slate-600">
          Standard error class for API responses with HTTP status codes.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-200">
          <code>{`import { ApiError } from "@/core/middleware/api-errors";
import { errorResponse } from "@/core/middleware/api-errors";

throw new ApiError(404, "User not found");

// In a route handler:
return errorResponse(error);`}</code>
        </pre>
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Config</h2>
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-base leading-7 text-slate-600">
          Zod-validated environment configuration singleton.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-200">
          <code>{`import { config } from "@/core/config/env";

console.log(config.DATABASE_URL);
console.log(config.NODE_ENV);`}</code>
        </pre>
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Logger</h2>
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-base leading-7 text-slate-600">
          Structured JSON logger with log-level filtering.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-200">
          <code>{`import { logger } from "@/core/logger/logger";

logger.info("User created", { userId: "abc" });
logger.error("Operation failed", { error: err.message });`}</code>
        </pre>
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-950">Security Headers</h2>
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-base leading-7 text-slate-600">
          Middleware that applies CSP, HSTS, X-Frame-Options, and other security headers.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-200">
          <code>{`// middleware.ts
export { securityMiddleware as middleware } from "@/core/security/headers";`}</code>
        </pre>
      </div>
    </div>
  );
}
