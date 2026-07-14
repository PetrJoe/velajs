#!/usr/bin/env node

import { execSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";

const SCRIPTS = {
  dev: "next dev",
  build: "next build",
  start: "next start",
  lint: "eslint .",
  typecheck: "tsc --noEmit",
  test: "vitest",
  make: "tsx src/cli/index.ts",
  "make:app": "tsx src/cli/index.ts make:app",
  "make:resource": "tsx src/cli/index.ts make:resource",
  "make:migration": "tsx src/cli/index.ts make:migration",
  "make:controller": "tsx src/cli/index.ts make:controller",
  "make:service": "tsx src/cli/index.ts make:service",
  "make:model": "tsx src/cli/index.ts make:model",
  "make:validator": "tsx src/cli/index.ts make:validator",
  "make:test": "tsx src/cli/index.ts make:test",
  "make:ui": "tsx src/cli/index.ts make:ui",
  "db:migrate": "knex migrate:latest --knexfile knexfile.ts",
  "db:rollback": "knex migrate:rollback --knexfile knexfile.ts",
  "db:seed": "knex seed:run --knexfile knexfile.ts",
  worker: "tsx src/core/jobs/worker.ts",
};

const DEPENDENCIES = [
  "@auth/core",
  "@next/env",
  "clsx",
  "dotenv",
  "handlebars",
  "knex",
  "lucide-react",
  "next",
  "pg",
  "react",
  "react-dom",
  "tailwind-merge",
  "zod",
];

const DEV_DEPENDENCIES = [
  "@tailwindcss/postcss",
  "@testing-library/react",
  "@types/node",
  "@types/pg",
  "@types/react",
  "@types/react-dom",
  "@typescript-eslint/parser",
  "autoprefixer",
  "eslint",
  "eslint-config-next",
  "jsdom",
  "postcss",
  "tailwindcss",
  "tsx",
  "typescript",
  "vitest",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function prompt(query) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(query, (answer) => { rl.close(); resolve(answer.trim()); }));
}

function run(cmd, cwd, label) {
  try {
    execSync(cmd, { cwd, stdio: "pipe", timeout: 120_000 });
  } catch {
    console.warn(`  \u26a0\ufe0f  ${label} failed. You may need to run it manually.`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const projectName = args[1];

  if (!command || command === "--help" || command === "-h") {
    console.log(`
  velajs CLI — Create new velajs projects

  Usage:
    npx velajs create <project-name>

  Examples:
    npx velajs create my-app
    npx velajs create my-blog-app
`);
    process.exit(0);
  }

  if (command !== "create") {
    console.error(`Unknown command: ${command}`);
    console.error("Usage: npx velajs create <project-name>");
    process.exit(1);
  }

  if (!projectName) {
    console.error("Error: Please specify a project name.");
    console.error("Usage: npx velajs create <project-name>");
    process.exit(1);
  }

  if (!/^[a-z0-9][a-z0-9._-]*$/.test(projectName)) {
    console.error("Error: Project name must start with a lowercase letter or number, and can only contain lowercase letters, numbers, dots, hyphens, and underscores.");
    process.exit(1);
  }

  const targetDir = resolve(process.cwd(), projectName);
  const sourceDir = resolve(new URL(import.meta.url).pathname, "../..");

  if (existsSync(targetDir)) {
    const answer = await prompt(`Directory "${projectName}" already exists. Overwrite? (y/N) `);
    if (answer.toLowerCase() !== "y") {
      console.log("Aborted.");
      process.exit(0);
    }
  }

  console.log(`\n  \u2728 Creating velajs project: ${projectName}\n`);

  mkdirSync(targetDir, { recursive: true });

  const EXCLUDE_DIRS = new Set(["node_modules", ".next", ".git", ".github"]);
  const EXCLUDE_FILES = new Set(["package-lock.json", "tsconfig.tsbuildinfo", "updates.md"]);

  function copyDir(src, dest) {
    mkdirSync(dest, { recursive: true });
    const entries = readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);
      if (entry.isDirectory()) {
        if (!EXCLUDE_DIRS.has(entry.name)) copyDir(srcPath, destPath);
      } else if (!EXCLUDE_FILES.has(entry.name) && !entry.name.startsWith(".env")) {
        copyFileSync(srcPath, destPath);
      }
    }
  }

  copyDir(sourceDir, targetDir);

  const pkg = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: SCRIPTS,
    dependencies: Object.fromEntries(DEPENDENCIES.map((d) => [d, "latest"])),
    devDependencies: Object.fromEntries(DEV_DEPENDENCIES.map((d) => [d, "latest"])),
  };

  writeFileSync(join(targetDir, "package.json"), JSON.stringify(pkg, null, 2) + "\n");

  const envExample = `NODE_ENV=development
APP_URL=http://localhost:3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/${projectName.replace(/-/g, "_")}
AUTH_SECRET=${generateSecret()}
LOG_LEVEL=debug
JOB_QUEUE_ADAPTER=database
`;

  writeFileSync(join(targetDir, ".env.example"), envExample);
  writeFileSync(join(targetDir, ".env"), envExample);

  writeFileSync(
    join(targetDir, ".gitignore"),
    `node_modules/
.next/
.env
.env.local
*.tsbuildinfo
dist/
`
  );

  console.log("  \ud83d\udce5 Installing dependencies...");
  run("npm install", targetDir, "npm install");

  console.log("  \ud83d\udce6 Initializing git...");
  run("git init", targetDir, "git init");
  run("git add -A", targetDir, "git add");
  run('git commit -m "Initial commit from velajs"', targetDir, "git commit");

  console.log(`
  \u2705 Successfully created "${projectName}"!

  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    ${projectName}
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  Next steps:

    cd ${projectName}
    npm run db:migrate
    npm run dev

  Documentation: https://velajs.dev/docs
`);
}

function generateSecret() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 48; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

main().catch((err) => {
  console.error("Unexpected error:", err.message);
  process.exit(1);
});
