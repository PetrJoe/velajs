export type JobStatus = "queued" | "running" | "succeeded" | "failed";

export type Job<TPayload = unknown> = {
  id: string;
  name: string;
  payload: TPayload;
  attempts: number;
  maxAttempts: number;
  runAt: Date;
};

export type JobHandler<TPayload = unknown> = (job: Job<TPayload>) => Promise<void>;

const handlers = new Map<string, JobHandler>();

export function defineJob<TPayload>(name: string, handler: JobHandler<TPayload>) {
  handlers.set(name, handler as JobHandler);
}

export function getJobHandler(name: string) {
  return handlers.get(name);
}

export async function enqueue<TPayload>(name: string, payload: TPayload, options: Partial<Pick<Job, "maxAttempts" | "runAt">> = {}) {
  return {
    id: crypto.randomUUID(),
    name,
    payload,
    attempts: 0,
    maxAttempts: options.maxAttempts ?? 3,
    runAt: options.runAt ?? new Date()
  };
}
