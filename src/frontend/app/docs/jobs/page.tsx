import { Cpu, Clock, RefreshCw, List, ArrowRight } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-purple-500" />
        Jobs & Queues
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Jobs & Queues</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        Background job processing with job definitions, enqueueing, and a worker process.
        Supports database and Redis adapters for job persistence.
      </p>

      <Section title="Architecture">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Job Definition", desc: "Register handlers for named jobs using defineJob(). Handlers receive typed payloads." },
            { title: "Job Enqueuing", desc: "Push jobs to the queue with enqueue(). Supports maxAttempts and scheduled runAt times." },
            { title: "Worker Process", desc: "Separate process that polls the queue and executes jobs. Run with npm run worker." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Job Types">
        <ApiBlock
          importPath="@/core/jobs/queue"
          exports={["Job", "JobStatus", "JobHandler", "defineJob", "getJobHandler", "enqueue"]}
        />

        <CodeBlock>{`interface Job<TPayload = unknown> {
  id: string;           // Unique job ID (UUID)
  name: string;         // Job type name
  payload: TPayload;    // Typed job data
  attempts: number;     // Current attempt count
  maxAttempts: number;  // Max retry attempts (default: 3)
  runAt: Date;          // When to run (immediate or scheduled)
}

type JobStatus = "queued" | "running" | "succeeded" | "failed";`}</CodeBlock>
      </Section>

      <Section title="Defining a Job">
        <CodeBlock>{`import { defineJob } from "@/core/jobs/queue";

interface SendEmailPayload {
  to: string;
  subject: string;
  body: string;
}

defineJob<SendEmailPayload>("send:email", async (job) => {
  console.log(\`Sending email to \${job.payload.to}\`);
  // Your email sending logic here

  // If this throws, the job will be retried (up to maxAttempts)
});`}</CodeBlock>
      </Section>

      <Section title="Enqueuing Jobs">
        <CodeBlock>{`import { enqueue } from "@/core/jobs/queue";

// Enqueue a job to run immediately
await enqueue("send:email", {
  to: "user@example.com",
  subject: "Welcome!",
  body: "Thank you for signing up.",
});

// Enqueue a job to run after a delay (scheduled)
await enqueue("generate:report", { userId: "abc" }, {
  maxAttempts: 5,
  runAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
});`}</CodeBlock>
      </Section>

      <Section title="Worker Process">
        <p>Run the worker to process queued jobs:</p>
        <CodeBlock>{`npm run worker`}</CodeBlock>

        <p className="mt-4">The worker logs its startup and adapter configuration:</p>
        <CodeBlock>{`{"level":"info","message":"Worker process started","adapter":"database"}`}</CodeBlock>

        <p className="mt-4">The worker adapter is configured via the <InlineCode>JOB_QUEUE_ADAPTER</InlineCode> environment variable:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
          <li><InlineCode>database</InlineCode> — jobs persisted in PostgreSQL (requires jobs table)</li>
          <li><InlineCode>redis</InlineCode> — jobs persisted in Redis (requires Redis instance)</li>
        </ul>
      </Section>

      <Section title="Retry Logic">
        <p>Jobs have built-in retry support:</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600">
          <li><strong>Automatic retries</strong> — if a job handler throws an error, the job is retried</li>
          <li><strong>Configurable attempts</strong> — set <InlineCode>maxAttempts</InlineCode> per job (default: 3)</li>
          <li><strong>Status tracking</strong> — jobs transition through <InlineCode>queued &rarr; running &rarr; succeeded | failed</InlineCode></li>
        </ul>
      </Section>

      <Section title="Example: Complete Workflow">
        <CodeBlock>{`// 1. Define the job in your app module
// src/apps/billing/jobs/invoice-job.ts
import { defineJob } from "@/core/jobs/queue";

interface GenerateInvoicePayload {
  orderId: string;
  userId: string;
}

defineJob<GenerateInvoicePayload>("billing:generate-invoice", async (job) => {
  const { orderId, userId } = job.payload;
  // Fetch order, generate PDF, send email...
  console.log(\`Generated invoice for order \${orderId}\`);
});

// 2. Enqueue the job from a service
// src/apps/billing/services/billing-service.ts
import { enqueue } from "@/core/jobs/queue";

export class BillingService {
  async createOrder(items: CartItem[]) {
    const order = await this.orders.create(items);
    await enqueue("billing:generate-invoice", {
      orderId: order.id,
      userId: order.userId,
    });
    return order;
  }
}

// 3. Run the worker
// npm run worker`}</CodeBlock>
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
