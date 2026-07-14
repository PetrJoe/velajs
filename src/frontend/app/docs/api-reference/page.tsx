import { Database, Shield, Settings, FileText, Key, Cpu, Box, Layers, Globe, Lock } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-violet-500" />
        API Reference
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">API Reference</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        Complete reference for all framework modules, classes, functions, and utilities.
      </p>

      {/* BaseRepository */}
      <Section title="BaseRepository">
        <p className="mb-4">Generic abstract repository class providing database access with built-in pagination, type safety, and transaction support.</p>
        <ApiBlock
          importPath="@/core/db/repository"
          exports={["BaseRepository", "Page", "PageOptions"]}
        />
        <CodeBlock>{`import { BaseRepository } from "@/core/db/repository";
import type { Page } from "@/core/db/repository";

interface UserRecord {
  id: string;
  email: string;
  name: string;
  role: string;
}

export class UserRepository extends BaseRepository<UserRecord> {
  constructor() {
    super("users");
  }

  async findById(id: string) {
    return this.table().where({ id }).first();
  }

  async findByEmail(email: string) {
    return this.table().where({ email }).first();
  }

  async findAll(page = 1, perPage = 20) {
    const query = this.table().orderBy("created_at", "desc");
    return this.paginate(query, { page, perPage });
  }
}`}</CodeBlock>
        <h3 className="mt-6 text-lg font-semibold text-slate-900">Methods</h3>
        <div className="mt-3 space-y-3">
          <Method method="protected table()" returns="Knex.QueryBuilder" desc="Returns a query builder for the configured table. Use this for all database operations." />
          <Method method="async paginate(query, options?)" returns="Promise<Page<T>>" desc="Paginates a query with meta information (page, perPage, total, totalPages). Defaults: page=1, perPage=20, max perPage=100." />
        </div>
      </Section>

      {/* Config */}
      <Section title="Config">
        <p className="mb-4">Zod-validated environment configuration singleton. Validates all env vars on startup and provides typed access.</p>
        <ApiBlock
          importPath="@/core/config/env"
          exports={["config", "AppConfig"]}
        />
        <CodeBlock>{`import { config } from "@/core/config/env";

console.log(config.nodeEnv);      // "development" | "test" | "production"
console.log(config.databaseUrl);  // PostgreSQL connection string
console.log(config.authSecret);   // HMAC signing key
console.log(config.appUrl);       // Application URL
console.log(config.logLevel);     // "trace" | "debug" | "info" | "warn" | "error"
console.log(config.isProduction); // boolean
console.log(config.isDevelopment);// boolean`}</CodeBlock>
      </Section>

      {/* Logger */}
      <Section title="Logger">
        <p className="mb-4">Structured JSON logger with five log levels and log-level filtering. Outputs JSON-formatted log entries for log aggregation tools.</p>
        <ApiBlock
          importPath="@/core/logger/logger"
          exports={["logger"]}
        />
        <CodeBlock>{`import { logger } from "@/core/logger/logger";

logger.trace("Entering function", { fn: "calculateTotal" });
logger.debug("Query executed", { duration: 42 });
logger.info("User created", { userId: "abc-123" });
logger.warn("Rate limit approaching", { remaining: 5 });
logger.error("Payment failed", { error: "insufficient_funds" });`}</CodeBlock>
        <p>Log level is controlled by the <InlineCode>LOG_LEVEL</InlineCode> env var. Entries below the threshold are filtered out at the source.</p>
      </Section>

      {/* Cache */}
      <Section title="Cache">
        <p className="mb-4">Simple in-memory cache with TTL support. Uses a Map-based store with automatic expiration.</p>
        <ApiBlock
          importPath="@/core/cache/cache"
          exports={["cacheSet", "cacheGet"]}
        />
        <CodeBlock>{`import { cacheSet, cacheGet } from "@/core/cache/cache";

// Set with 5-second TTL
cacheSet("user:abc", { name: "Alice" }, 5_000);

// Get (returns undefined if expired or not found)
const user = cacheGet<{ name: string }>("user:abc");`}</CodeBlock>
      </Section>

      {/* Database Client */}
      <Section title="Database Client">
        <p className="mb-4">Knex database client singleton with connection pooling. Provides a lazy-initialized connection and transaction helper.</p>
        <ApiBlock
          importPath="@/core/db/client"
          exports={["db", "transaction"]}
        />
        <CodeBlock>{`import { db, transaction } from "@/core/db/client";

// Direct query access
const users = await db("users").where({ role: "admin" });

// Transactions
await transaction(async (trx) => {
  await trx("accounts").decrement("balance", 100);
  await trx("ledger").insert({ amount: 100 });
});`}</CodeBlock>
      </Section>

      {/* Pagination */}
      <Section title="Pagination Validator">
        <p className="mb-4">Zod schema for validating pagination query parameters.</p>
        <ApiBlock
          importPath="@/shared/validators/pagination"
          exports={["paginationSchema"]}
        />
        <CodeBlock>{`import { paginationSchema } from "@/shared/validators/pagination";

const { page, perPage } = paginationSchema.parse({
  page: "1",
  perPage: "20"
});
// page: 1 (number), perPage: 20 (number)`}</CodeBlock>
      </Section>

      {/* cn utility */}
      <Section title="cn() Utility">
        <p className="mb-4">Utility function for conditionally joining class names with Tailwind CSS support. Combines <InlineCode>clsx</InlineCode> and <InlineCode>tailwind-merge</InlineCode>.</p>
        <ApiBlock
          importPath="@/shared/utils/cn"
          exports={["cn"]}
        />
        <CodeBlock>{`import { cn } from "@/shared/utils/cn";

cn("px-4 py-2", isActive && "bg-blue-500", className);
// Merges conflicting Tailwind classes, resolves the last one`}</CodeBlock>
      </Section>

      {/* API Response Types */}
      <Section title="API Response Types">
        <p className="mb-4">TypeScript types for standardized API responses.</p>
        <ApiBlock
          importPath="@/shared/types/api"
          exports={["ApiSuccess", "ApiFailure"]}
        />
        <CodeBlock>{`import type { ApiSuccess, ApiFailure } from "@/shared/types/api";

// Success response shape
type Success = ApiSuccess<{ id: string }>;
// { data: { id: string } }

// Error response shape
type Failure = ApiFailure;
// { error: { code: string, message: string, details?: unknown } }`}</CodeBlock>
      </Section>

      {/* Health Check */}
      <Section title="Health Check">
        <p className="mb-4">Database connectivity health check endpoint.</p>
        <ApiBlock
          importPath="@/core/observability/health"
          exports={["healthCheck"]}
        />
        <CodeBlock>{`import { healthCheck } from "@/core/observability/health";

const status = await healthCheck();
// { status: "ok", database: "ok", durationMs: 3, checkedAt: "..." }`}</CodeBlock>
      </Section>

      {/* RBAC */}
      <Section title="RBAC (Role-Based Access Control)">
        <p className="mb-4">Permission system with role-permission mapping and authorization helpers.</p>
        <ApiBlock
          importPath="@/core/permissions/rbac"
          exports={["can", "requirePermission", "Role", "Permission"]}
        />
        <CodeBlock>{`import { can, requirePermission } from "@/core/permissions/rbac";
import type { Role } from "@/core/permissions/rbac";

if (can("member", "users.read")) {
  // Allowed
}

requirePermission("member", "users.write");
// Throws if missing permission`}</CodeBlock>
        <h3 className="mt-6 text-lg font-semibold text-slate-900">Roles</h3>
        <p className="mt-2 text-sm text-slate-600">Three built-in roles: <InlineCode>admin</InlineCode>, <InlineCode>manager</InlineCode>, <InlineCode>member</InlineCode>.</p>
        <h3 className="mt-6 text-lg font-semibold text-slate-900">Permissions</h3>
        <p className="mt-2 text-sm text-slate-600">Permissions follow the pattern <InlineCode>&lt;resource&gt;.&lt;action&gt;</InlineCode> (e.g. <InlineCode>users.read</InlineCode>, <InlineCode>products.write</InlineCode>).</p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-4 text-base leading-7 text-slate-600">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
      <code>{children}</code>
    </pre>
  );
}

function ApiBlock({ importPath, exports }: { importPath: string; exports: string[] }) {
  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium">Import:</span>
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-800">{importPath}</code>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium">Exports:</span>
        <span className="flex flex-wrap gap-1">
          {exports.map((exp) => (
            <code key={exp} className="rounded bg-white px-1.5 py-0.5 font-mono text-emerald-700">{exp}</code>
          ))}
        </span>
      </div>
    </div>
  );
}

function Method({ method, returns, desc }: { method: string; returns: string; desc: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-baseline gap-2">
        <code className="font-mono text-sm font-semibold text-slate-900">{method}</code>
        <span className="text-xs text-slate-400">&rarr; <InlineCode>{returns}</InlineCode></span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">{children}</code>
  );
}
