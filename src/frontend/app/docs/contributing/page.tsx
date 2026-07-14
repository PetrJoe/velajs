import { Code2, GitBranch, TestTube, FileCode, CheckCircle, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContributingPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-indigo-500" />
        Contributing
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Contributing to nextforge</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        We welcome contributions from the community. Whether it&apos;s fixing a bug, adding a feature,
        improving documentation, or proposing new ideas — every contribution makes the framework better.
      </p>

      <Section title="Code of Conduct">
        <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
          We are committed to providing a welcoming and inclusive experience for everyone.
          By participating, you agree to treat others with respect, provide constructive feedback,
          and focus on what&apos;s best for the community.
        </div>
      </Section>

      <Section title="Development Setup">
        <p>Get started with local development:</p>
        <CodeBlock>{`git clone https://github.com/nextforge/nextforge.git
cd nextforge
npm install
cp .env.example .env
npm run db:migrate
npm run dev`}</CodeBlock>

        <p className="mt-4">You&apos;ll need:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
          <li>Node.js 20+ and npm 9+</li>
          <li>PostgreSQL 15+ running locally or via Docker</li>
          <li>A code editor (we recommend VS Code with the ESLint extension)</li>
        </ul>
      </Section>

      <Section title="Code Style">
        <p>The project enforces consistent code style through automated tooling:</p>
        <div className="mt-4 space-y-3">
          {[
            { rule: "TypeScript strict mode", desc: "No `any` types unless absolutely necessary. Use proper generics and type inference." },
            { rule: "ESLint enforcement", desc: "Run `npm run lint` before committing. The CI pipeline will fail if lint errors exist." },
            { rule: "Module conventions", desc: "Follow the established app module structure (controllers, services, repositories, validators, types, ui)." },
            { rule: "File naming", desc: "Use kebab-case for files (e.g., `user-service.ts`), PascalCase for components and classes." },
          ].map(({ rule, desc }) => (
            <div key={rule} className="rounded-lg border border-slate-200 bg-white p-3">
              <h4 className="text-sm font-semibold text-slate-900">{rule}</h4>
              <p className="mt-0.5 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Testing Requirements">
        <p>All new features and bug fixes must include tests:</p>
        <CodeBlock>{`npm test              # Run all tests
npm run typecheck     # TypeScript type checking
npm run lint          # ESLint`}</CodeBlock>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600">
          <li>Write unit tests for all new services, controllers, and utilities</li>
          <li>Add component tests for UI components using @testing-library/react</li>
          <li>Ensure existing tests continue to pass</li>
          <li>Test error paths, not just the happy path</li>
        </ul>
      </Section>

      <Section title="Pull Request Process">
        <div className="mt-4 space-y-4">
          {[
            { step: "1. Branch from main", desc: "Create a feature branch from `main`. Keep your branch focused on a single concern." },
            { step: "2. Make changes", desc: "Follow the code style and module conventions. Include tests for new functionality." },
            { step: "3. Run checks", desc: "Run `npm run lint`, `npm run typecheck`, and `npm test` to ensure everything passes." },
            { step: "4. Open a PR", desc: "Provide a clear title and description explaining what your PR does and why." },
            { step: "5. Address feedback", desc: "Reviewers may request changes. Respond to all feedback before merging." },
            { step: "6. Merge", desc: "Once approved, squash-merge your PR. The CI pipeline will run automatically." },
          ].map(({ step, desc }) => (
            <div key={step} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                {step[0]}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{step}</h4>
                <p className="mt-0.5 text-sm text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PR Checklist">
        <div className="mt-4 space-y-2">
          {[
            "Branch from `main`",
            "Keep PRs focused on a single concern",
            "Include tests for new functionality",
            "Update documentation if public APIs change",
            "Ensure all CI checks pass (lint, typecheck, test, build)",
            "Add changeset if your PR changes the API or behavior",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm">
              <CheckCircle className="size-4 text-slate-300" />
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Reporting Issues">
        <p>Found a bug or have a feature request? Open an issue on GitHub:</p>
        <div className="mt-4 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
          <strong>Bug reports:</strong> Include steps to reproduce, expected behavior, actual behavior,
          and environment details (Node.js version, OS, database version).
          <br /><br />
          <strong>Feature requests:</strong> Describe the problem you&apos;re trying to solve, not just
          the solution. This helps us evaluate the best approach.
        </div>
      </Section>

      <Section title="Getting Help">
        <p>If you need help with the contribution process:</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600">
          <li>Open a <a href="https://github.com/nextforge/nextforge/discussions" className="font-medium text-slate-900 underline" target="_blank" rel="noopener noreferrer">GitHub Discussion</a></li>
          <li>Check the          <Link href={"/docs" as any} className="font-medium text-slate-900 underline">documentation</Link></li>
          <li>Review existing issues and PRs for context</li>
        </ul>
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
