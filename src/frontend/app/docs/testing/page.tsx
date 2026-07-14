import { FlaskConical, TestTube, CheckCircle, FileCode, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TestingPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-green-500" />
        Testing
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Testing</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        nexar uses Vitest with @testing-library/react for testing. The framework includes
        a configured test environment with jsdom for component testing.
      </p>

      <Section title="Test Setup">
        <p>The test environment is pre-configured in <InlineCode>vitest.config.ts</InlineCode>:</p>
        <CodeBlock>{`import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    globals: true,
  },
});`}</CodeBlock>

        <p className="mt-4">The setup file (<InlineCode>src/tests/setup.ts</InlineCode>) configures global test utilities and mocks.</p>
      </Section>

      <Section title="Running Tests">
        <CodeBlock>{`npm test              # Run all tests (watch mode)
npm test -- --run     # Run all tests once (CI)
npm test -- --coverage  # Run with coverage report`}</CodeBlock>
      </Section>

      <Section title="Writing Unit Tests">
        <p>Test files should be placed alongside the code they test, with a <InlineCode>.test.ts</InlineCode> suffix:</p>
        <CodeBlock>{`// src/apps/users/services/__tests__/user-service.test.ts
import { describe, it, expect } from "vitest";

describe("UserService", () => {
  it("should create a user with valid input", async () => {
    // Your test here
    expect(true).toBe(true);
  });
});`}</CodeBlock>
      </Section>

      <Section title="Component Testing">
        <p>UI components can be tested with @testing-library/react:</p>
        <CodeBlock>{`// src/shared/ui/__tests__/button.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/shared/ui/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("applies variant classes", () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByText("Delete");
    expect(button.className).toContain("red");
  });
});`}</CodeBlock>
      </Section>

      <Section title="Testing API Routes">
        <p>Test API route handlers by calling them directly:</p>
        <CodeBlock>{`// src/apps/users/controllers/__tests__/user-controller.test.ts
import { describe, it, expect } from "vitest";
import { createUserController } from "../user-controller";

describe("createUserController", () => {
  it("returns 201 for valid input", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        name: "Test User",
        password: "secure-password",
      }),
    });

    const response = await createUserController(request);
    expect(response.status).toBe(201);
  });
});`}</CodeBlock>
      </Section>

      <Section title="Mocking Database">
        <p>For unit tests, mock the repository layer:</p>
        <CodeBlock>{`import { describe, it, expect, vi } from "vitest";

// Mock the database module
vi.mock("@/core/db/client", () => ({
  db: () => ({
    raw: vi.fn(),
  }),
}));`}</CodeBlock>
      </Section>

      <Section title="Testing Scripts">
        <p>The following npm scripts are available for testing:</p>
        <div className="mt-4 space-y-2">
          {[
            { script: "npm test", desc: "Run all tests with Vitest (watch mode)" },
            { script: "npm run typecheck", desc: "Run TypeScript type checking" },
            { script: "npm run lint", desc: "Run ESLint on the codebase" },
          ].map(({ script, desc }) => (
            <div key={script} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
              <code className="shrink-0 font-mono text-sm text-slate-800">{script}</code>
              <p className="text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
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

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">{children}</code>
  );
}
