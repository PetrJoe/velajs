<p align="center">
  <img src="https://img.shields.io/badge/version-0.2.8-blue" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript Strict" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" />
</p>

<br />

<div align="center">
  <h1>nexar</h1>
  <p><strong>TypeScript-first fullstack framework for Next.js, PostgreSQL, Knex, and Tailwind CSS</strong></p>
  <p>Build enterprise-grade Next.js applications with structure, generators, security, and type safety — from day one.</p>
</div>

<br />

---

## Overview

**nexar** is a production-ready fullstack framework built on top of Next.js. It provides a modular monolith architecture with:

- **Scaffolding CLI** — Generate apps, resources, migrations, and UI components
- **Authentication** — Password hashing (scrypt), HMAC-signed sessions, auth API routes
- **API Layer** — Standard response envelope, CORS, CSRF, rate limiting, request validation
- **Database** — Knex.js with typed repositories, pagination, migrations, and transaction support
- **Security** — CSP headers, RBAC permissions, CSRF protection, rate limiting, secure cookies
- **UI Components** — 13+ production-ready components (Dialog, Dropdown, Tabs, Toast, etc.)
- **Dark Mode** — Built-in with toggle, persistent preference, and design tokens
- **Background Jobs** — Job definitions, enqueuing, worker process with retry logic
- **CI/CD** — GitHub Actions pipeline with lint, typecheck, test, and build stages

> **Stack:** Next.js 15+ · TypeScript (strict) · PostgreSQL · Knex.js · Zod · Tailwind CSS v4 · Vitest

---

## Quick Start

```bash
npx @voradev/nexar create my-app
cd my-app
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

Your app will be running at **http://localhost:3000**.

### Prerequisites

- Node.js 20+ and npm 9+
- PostgreSQL 15+ (or Docker)

---

## Feature Overview

### 🏗️ Modular App Architecture

Every domain module follows a consistent structure, making it easy to navigate any part of the codebase:

```
src/apps/orders/
  controllers/     # Request handling & response formatting
  services/        # Business logic & orchestration
  repositories/    # Data access & query building
  validators/      # Zod schemas for input validation
  types/           # TypeScript type definitions
  ui/              # React components
  routes/          # API route definitions
  migrations/      # Database migrations
  tests/           # Test files
```

### 🛠️ CLI Generators

Scaffold consistent, type-safe code with a single command:

```bash
npm run make:app users          # New domain module
npm run make:resource posts     # Full CRUD (controller + service + repository + validators + types + UI + tests + migration)
npm run make:migration          # Database migration
npm run make:controller         # Controller file
npm run make:service            # Service file
npm run make:validator          # Zod validator
npm run make:ui Button          # UI component
npm run make:test               # Test file
```

### 🔐 Authentication

Password hashing and session management using **Node.js built-in `crypto`** — zero extra dependencies:

```bash
# Auth API routes are ready to use:
POST /api/auth/register         # Create account (returns JWT-like session token)
POST /api/auth/login            # Sign in (returns session token)
POST /api/auth/logout           # Clear session
```

- **scrypt** password hashing with 32-byte salt, 64-byte key, memory-hard configuration
- **HMAC-SHA256** session tokens with expiration (7-day default)
- **HttpOnly, Secure, SameSite** cookies
- **Timing-safe** comparison for all verifications

### 🌐 API Layer

Consistent response envelope and middleware pipeline:

```typescript
import { success, created, notFound, unauthorized } from "@/core/middleware/api-response";

return success({ id: "abc" });           // { data: { id: "abc" } }
return unauthorized();                    // { error: { code: "UNAUTHORIZED", message: "..." } }
```

| Middleware | Description |
|---|---|
| **Response Envelope** | Standard `{ data }` / `{ error: { code, message, details } }` format |
| **CORS** | Configurable origins, methods, headers, credentials |
| **CSRF** | HMAC-signed tokens bound to session |
| **Rate Limiting** | Global (100/min), Auth (10/min), API (60/min) presets |
| **Request Validation** | Zod schema validation for body, query, headers |

### 🗄️ Database

Knex.js with a typed repository pattern and built-in pagination:

```typescript
import { BaseRepository } from "@/core/db/repository";
import type { Page } from "@/core/db/repository";

export class UserRepository extends BaseRepository<UserRecord> {
  constructor() { super("users"); }

  async findActive(page = 1) {
    const query = this.table().where("deleted_at", null).orderBy("created_at", "desc");
    return this.paginate(query, { page, perPage: 20 });
  }
}

// Result: { data: T[], meta: { page, perPage, total, totalPages } }
```

### 🛡️ Security

Security is built in at every layer:

| Layer | Protection |
|---|---|
| **HTTP Headers** | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| **Authentication** | scrypt password hashing, HMAC tokens, timing-safe comparison |
| **Authorization** | Role-based access control (admin, manager, member) |
| **CSRF** | Session-bound tokens for state-changing requests |
| **Rate Limiting** | Per-IP limits with configurable windows |
| **Cookies** | HttpOnly, Secure, SameSite=Lax |

### 🎨 UI Components

13+ production-ready components in `@/shared/ui/`:

```
Button    Card      Input     Select    Badge     Alert
Dialog    Dropdown  Tabs      Toast     Tooltip   Switch    Skeleton
```

All components support dark mode via the `.dark` class and use Tailwind CSS v4 design tokens.

### ⚡ Background Jobs

Simple job queue with retry logic:

```typescript
import { defineJob, enqueue } from "@/core/jobs/queue";

defineJob<{ orderId: string }>("billing:generate-invoice", async (job) => {
  // Process the job
});

await enqueue("billing:generate-invoice", { orderId: "abc" }, {
  maxAttempts: 5,
  runAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
});

// npm run worker
```

---

## Project Structure

```
src/
  apps/               # Domain modules (users, billing, products, etc.)
    users/            # Example app module
      controllers/    # Request handlers
      services/       # Business logic
      repositories/   # Database access
      validators/     # Zod schemas
      types/          # TypeScript types
      ui/             # React components
      index.ts        # Module exports
  core/               # Framework core
    auth/             # Password hashing, session management
    middleware/       # API response envelope, CORS, CSRF, rate limiting, validation
    config/           # Zod-validated environment variables
    db/               # Knex client, BaseRepository, pagination
    logger/           # Structured JSON logger
    cache/            # In-memory cache with TTL
    jobs/             # Job queue, worker process
    security/         # CSP headers, security middleware
    permissions/      # RBAC roles and permissions
    observability/    # Health check endpoint
  database/           # Knex migrations, seeds
  frontend/           # Next.js App Router pages
    app/              # Route pages (docs, showcase, about, etc.)
    layouts/          # AppShell, SidebarLayout
    styles/           # globals.css, design tokens
    design-system/    # Token constants
  shared/             # Cross-app code
    ui/               # Component library (Button, Card, Dialog, etc.)
    types/            # Shared TypeScript types
    utils/            # cn() utility, string helpers
    validators/       # Pagination schema
  cli/                # Scaffolding CLI
    commands/         # make:app, make:resource, etc.
    utils/            # Template helpers
  tests/              # Test setup
  app/                # Next.js App Router (routes)
    api/              # API routes (auth, health)
    docs/             # Documentation site (14 pages)
    showcase/         # Examples showcase
    about/            # About page
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | ✅ | — | PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | — | HMAC key for session signing (min 16 chars) |
| `NODE_ENV` | — | `development` | Application environment |
| `APP_URL` | — | `http://localhost:3000` | Used for CORS |
| `LOG_LEVEL` | — | `info` | trace, debug, info, warn, error |
| `JOB_QUEUE_ADAPTER` | — | `database` | database or redis |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm test` | Run tests (Vitest) |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:rollback` | Roll back last migration batch |
| `npm run db:seed` | Run seed files |
| `npm run worker` | Start background job worker |

### Make Commands

| Command | Description |
|---|---|
| `npm run make:app <name>` | Scaffold a new domain module |
| `npm run make:resource <name>` | Generate full CRUD |
| `npm run make:migration <name>` | Create timestamped migration |
| `npm run make:controller <name>` | Generate controller |
| `npm run make:service <name>` | Generate service |
| `npm run make:validator <name>` | Generate Zod validator |
| `npm run make:ui <name>` | Generate UI component |
| `npm run make:test <name>` | Generate test file |
| `npm run make:model <name>` | Generate repository |

---

## Documentation

Comprehensive documentation is available at **`/docs`** when running the application:

- [Getting Started](/docs/getting-started) — Quick start guide
- [Installation](/docs/installation) — Prerequisites and setup
- [Architecture](/docs/architecture) — Project structure and design
- [CLI Reference](/docs/cli) — All scaffold commands
- [API Reference](/docs/api-reference) — Complete framework APIs
- [API Layer](/docs/api-layer) — Response envelope, CORS, CSRF, rate limiting
- [Authentication](/docs/authentication) — Password hashing, sessions, auth API
- [Database](/docs/database) — Repositories, migrations, pagination
- [Security](/docs/security) — Headers, CSP, RBAC, hardening
- [Frontend](/docs/frontend) — UI components, layouts, dark mode
- [Jobs & Queues](/docs/jobs) — Background processing
- [Testing](/docs/testing) — Vitest, component tests
- [Deployment](/docs/deployment) — Docker, CI/CD, platforms

---

## Architecture

nexar follows a **modular monolith** architecture:

```
HTTP Request
  │
  ▼
Next.js App Router ──── File-system based routing
  │
  ▼
Middleware Pipeline ──── Security headers → CORS → CSRF → Rate limiting
  │
  ▼
Controller ───────────── Input validation (Zod) → Delegation
  │
  ▼
Service ──────────────── Business logic → Permission checks
  │
  ▼
Repository ───────────── Knex queries → Typed results
  │
  ▼
Response ─────────────── Standard `{ data }` or `{ error }` envelope
```

### Key Technology Decisions

| Decision | Rationale |
|---|---|
| **Knex** over ORM | Explicit SQL, migration workflow, no hidden queries |
| **Zod** over Yup/Joi | Superior TypeScript inference, works client & server |
| **scrypt** over bcrypt | Node.js built-in, FIPS-compliant, zero dependencies |
| **HMAC tokens** over JWT | No library needed, simpler, equally secure for first-party auth |
| **Tailwind v4** | Utility-first, design tokens, dark mode, minimal bundle |
| **Handlebars** for CLI templates | Zero runtime cost in production |

---

## Contributing

We welcome contributions! See the [Contributing Guide](/docs/contributing) for details.

- Report bugs via [GitHub Issues](https://github.com/nexar/nexar/issues)
- Submit pull requests for bug fixes or features
- Improve documentation and examples

---

## License

MIT &copy; nexar

---

## Changelog

### 0.2.8

- Initial public release
- Modular app architecture with CLI generators
- Authentication system (scrypt hashing, HMAC sessions)
- API middleware (CORS, CSRF, rate limiting, validation)
- Database layer (Knex, BaseRepository, pagination)
- UI component library (13 components)
- Security headers and RBAC
- Background job queue
- Comprehensive documentation (14 pages)
- CI/CD pipeline (GitHub Actions)
- Dark mode support
- Docker setup
