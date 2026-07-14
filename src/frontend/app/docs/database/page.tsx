import { Database, Table, Layers, ArrowRight, GitBranch } from "lucide-react";
import Link from "next/link";

export default function DatabasePage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-emerald-500" />
        Database
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Database</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        velajs uses Knex.js for database access — providing explicit SQL, migration workflow,
        and a typed repository pattern with built-in pagination.
      </p>

      <Section title="Architecture">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Knex Client", desc: "Lazy-initialized singleton with connection pooling. Configurable pool size (default: min 0, max 10)." },
            { title: "BaseRepository", desc: "Abstract generic class providing typed table access, pagination, and transaction support for all domain repositories." },
            { title: "Migrations", desc: "Framework-agnostic Knex migrations with CLI generation. Each migration is a timestamped TypeScript file." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Database Client">
        <p>The database client is a singleton that connects lazily on first use.</p>

        <ApiBlock
          importPath="@/core/db/client"
          exports={["db", "transaction"]}
        />

        <CodeBlock>{`import { db, transaction } from "@/core/db/client";

// Direct queries
const users = await db("users")
  .where({ role: "admin" })
  .orderBy("created_at", "desc");

// Raw SQL
const result = await db.raw("select 1 as ok");

// Transactions with automatic rollback on error
await transaction(async (trx) => {
  await trx("accounts").decrement("balance", 100);
  await trx("ledger").insert({ amount: 100, type: "debit" });
});`}</CodeBlock>
      </Section>

      <Section title="BaseRepository">
        <p>The <InlineCode>BaseRepository</InlineCode> class provides a foundation for all domain repositories with type safety and pagination.</p>

        <ApiBlock
          importPath="@/core/db/repository"
          exports={["BaseRepository", "Page", "PageOptions"]}
        />

        <CodeBlock>{`import { BaseRepository } from "@/core/db/repository";
import type { Page } from "@/core/db/repository";

type ProductRecord = {
  id: string;
  name: string;
  price: number;
  created_at: Date;
};

export class ProductRepository extends BaseRepository<ProductRecord> {
  constructor() {
    super("products");
  }

  async findById(id: string) {
    return this.table().where({ id }).first();
  }

  async findActive(page = 1) {
    const query = this.table()
      .where("deleted_at", null)
      .orderBy("created_at", "desc");

    return this.paginate(query, { page, perPage: 20 });
  }
}`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Pagination</h3>
        <p>The <InlineCode>paginate()</InlineCode> method returns a typed <InlineCode>Page</InlineCode> object:</p>
        <CodeBlock>{`interface Page<T> {
  data: T[];
  meta: {
    page: number;        // Current page (1-indexed)
    perPage: number;     // Items per page
    total: number;       // Total items matching query
    totalPages: number;  // Total pages
  };
}`}</CodeBlock>
      </Section>

      <Section title="Migrations">
        <p>Migrations are timestamped TypeScript files in <InlineCode>src/database/migrations/</InlineCode>. Create them with the CLI:</p>

        <CodeBlock>{`npm run make:migration create_products_table`}</CodeBlock>

        <p className="mt-4">This generates:</p>
        <CodeBlock>{`import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("products");
}`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Running Migrations</h3>
        <CodeBlock>{`npm run db:migrate     # Apply pending migrations
npm run db:rollback    # Roll back last batch
npm run db:seed        # Run seed files`}</CodeBlock>
      </Section>

      <Section title="Seed Data">
        <p>The framework includes a seed file for the <InlineCode>users</InlineCode> table. Create additional seeds in <InlineCode>src/database/seeds/</InlineCode>:</p>
        <CodeBlock>{`// src/database/seeds/products.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();
  await knex("products").insert([
    { id: crypto.randomUUID(), name: "Widget", price: 9.99 },
    { id: crypto.randomUUID(), name: "Gadget", price: 19.99 },
  ]);
}`}</CodeBlock>
      </Section>

      <Section title="Connection Pooling">
        <p>The database connection pool is configured in <InlineCode>src/core/db/client.ts</InlineCode>:</p>
        <CodeBlock>{`pool: {
  min: 0,     // Minimum connections (0 = no persistent connections)
  max: 10     // Maximum connections
}`}</CodeBlock>
        <p>Adjust these values based on your deployment environment. For serverless deployments, consider using <InlineCode>min: 0</InlineCode> to avoid cold-start connection overhead.</p>
      </Section>

      <Section title="Example: Complete Repository">
        <CodeBlock>{`import { BaseRepository } from "@/core/db/repository";
import type { Page } from "@/core/db/repository";

interface OrderRecord {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: Date;
}

export class OrderRepository extends BaseRepository<OrderRecord> {
  constructor() {
    super("orders");
  }

  async findByUser(userId: string, page = 1) {
    const query = this.table()
      .where({ user_id: userId })
      .orderBy("created_at", "desc");
    return this.paginate(query, { page });
  }

  async findPending() {
    return this.table()
      .where({ status: "pending" })
      .orderBy("created_at", "asc");
  }

  async updateStatus(id: string, status: string) {
    const [record] = await this.table()
      .where({ id })
      .update({ status, updated_at: new Date() })
      .returning("*");
    return record;
  }
}`}</CodeBlock>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">{children}</div>
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

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">{children}</code>
  );
}
