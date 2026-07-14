# @velajs — Framework Audit & Roadmap

## Current state

@velajs (internally `velajs`, v0.2.7) is a **fullstack starter** built on Next.js, Knex, PostgreSQL, Zod, and Tailwind. It provides structure and generators but is not yet a **standard framework** in the ecosystem sense.

### What exists today

| Area | Details |
|---|---|
| **CLI generators** | `make:app`, `make:resource`, `make:migration`, `make:ui` with Handlebars templating |
| **Module system** | `src/apps/<name>` with controllers, services, repositories, validators, types, ui |
| **Database** | Knex client singleton, `BaseRepository` with pagination, migrations, seeds |
| **Validation** | Zod schemas per app, shared pagination validator |
| **Auth** | `SessionUser` / `AppSession` types, placeholder `getSession()` returning null |
| **RBAC** | `Role` / `Permission` types, `can()` and `requirePermission()` helpers |
| **Security** | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy middleware |
| **Error handling** | `ApiError` class, `errorResponse()` for Zod/ApiError/generic errors |
| **Logging** | Structured JSON logger with log-level filtering |
| **Config** | Zod-validated env schema, singleton config object |
| **Cache** | In-memory `Map`-based `cacheSet`/`cacheGet` with TTL |
| **Jobs** | `Job` types, `defineJob()`, `enqueue()`, placeholder worker |
| **Plugin registry** | `registerPlugin()` / `getPlugins()` with zod schema |
| **Health check** | DB connectivity check endpoint |
| **UI primitives** | `Button`, `Card`, `Input`, `Badge`, `Alert` (Tailwind) |
| **Layouts** | `AppShell`, `AuthLayout`, `SidebarLayout` |
| **Design tokens** | Radius, spacing, typography constants |
| **Utilities** | `cn()` (clsx + tailwind-merge), string helpers, file template helpers |
| **Testing** | Vitest + jsdom + @testing-library/react setup |
| **Docker** | Dockerfile (dev-only), docker-compose.yml |
| **TypeScript** | Strict, ES2022, path aliases (`@/`) |
| **Dev tooling** | ESLint, Tailwind v4, PostCSS |

---

## What's needed for a "standard framework"

### 1. Identity & Branding

- [ ] Rename consistently (currently mixes `velajs`, `vorajs`, `velajs`)
- [ ] Logo, brand colors, tagline
- [ ] Dedicated documentation site (not just README)
- [ ] npm org (`@velajs/*`) with scoped packages
- [ ] Semantic versioning + CHANGELOG.md

### 2. Auth System (real)

- [ ] Full OAuth / credential sign-in (next-auth / Auth.js integration)
- [ ] Session middleware for API routes
- [ ] Password hashing (bcrypt/argon2) + reset flow
- [ ] Email verification
- [ ] MFA support
- [ ] `getSession()` that actually reads cookies/tokens
- [ ] Auth UI: sign-in/sign-up pages, forgot password

### 3. API Layer

- [ ] Standard API response envelope (already have `ApiSuccess`/`ApiFailure` types — not wired)
- [ ] Rate limiting (in-memory or Redis-backed)
- [ ] Request validation middleware (auto-parse Zod on route)
- [ ] API versioning convention (e.g. `/api/v1/...`)
- [ ] OpenAPI / Swagger generation from Zod schemas
- [ ] WebSocket support (e.g. via Socket.io or server-sent events)
- [ ] CORS middleware with per-origin configuration
- [ ] CSRF protection for state-changing requests
- [ ] Request body size limiting
- [ ] Helmet.js integration for security headers

### 4. Database & ORM

- [ ] Migration generator (`make:migration` already exists but schema helpers are minimal)
- [ ] Seed factories (generate realistic test data)
- [ ] Query builder helpers (soft deletes, multi-tenant scoping, full-text search)
- [ ] Database-aware test helpers (transaction rollback between tests)
- [ ] Connection pooling config per environment
- [ ] Migration check in CI
- [ ] Column-level encryption for sensitive data
- [ ] Row-level security (RLS) policies for multi-tenant isolation
- [ ] Audit triggers on critical tables
- [ ] Prepared statement enforcement (Knex already uses them)

### 5. Background Jobs

- [ ] Working worker process (currently a placeholder)
- [ ] Job persistence (DB table for jobs)
- [ ] Retry logic + backoff
- [ ] Scheduled / recurring jobs (cron)
- [ ] Job dashboard UI
- [ ] Dead letter queue
- [ ] Secure job payload validation and sanitization
- [ ] Rate-limited job dispatching to prevent abuse

### 6. File Storage & Upload

- [ ] File upload endpoint
- [ ] Local + S3/R2 adapter pattern
- [ ] Image optimization pipeline
- [ ] Signed URLs for private files
- [ ] File type validation using magic bytes (not just extension)
- [ ] File size limits per upload
- [ ] Antivirus / malware scanning pipeline
- [ ] Path traversal prevention on file storage operations
- [ ] Secure filename sanitization

### 7. Email

- [ ] Email service abstraction (SendGrid, Resend, SMTP)
- [ ] Email template rendering (React email or Handlebars)
- [ ] Transactional email flows (welcome, reset password, etc.)
- [ ] SPF / DKIM / DMARC configuration for deliverability and spoofing prevention
- [ ] Rate limiting for transactional and notification emails
- [ ] Email template injection prevention (output escaping)

### 8. Frontend Framework

- [ ] More UI components (Dialog, Dropdown, Select, Table, Tabs, Toast, Tooltip, Modal, Drawer)
- [ ] Form library integration (React Hook Form + Zod resolver)
- [ ] Client-side data fetching patterns (SWR / TanStack Query)
- [ ] Loading states (skeleton, spinner)
- [ ] Optimistic updates
- [ ] Pagination / infinite scroll components
- [ ] Accessible component primitives (Radix UI / Headless UI)
- [ ] Theming system (dark/light mode toggle)
- [ ] i18n framework
- [ ] Subresource Integrity (SRI) for loaded scripts/styles
- [ ] Content Security Policy reporting (report-uri / report-to)
- [ ] Secure cookie defaults (HttpOnly, SameSite=Strict/Lax, Secure flag)
- [ ] Client-side XSS prevention utilities and DOM sanitization helpers

### 9. CLI (Production-grade)

- [ ] `velajs` initializer (npm create)
- [ ] `make:controller` / `make:service` (currently aliased to `make:app` — not actually separate)
- [ ] `make:middleware`, `make:plugin`, `make:test`
- [ ] Interactive prompts (not just positional args)
- [ ] `make:resource` — generate full CRUD (controller + routes + service + repository + validators + types + UI + tests + migration)
- [ ] Dry-run flag
- [ ] Plop / hygen-style local templates override
- [ ] Secure credential storage (no plain-text tokens in generated files)
- [ ] Dependency integrity verification (lockfile audit, supply-chain security)

### 10. Observability

- [ ] Request logging middleware (method, path, duration, status)
- [ ] Telemetry / OpenTelemetry integration
- [ ] Error tracking adapter (Sentry, Highlight, etc.)
- [ ] Performance metrics (memory, CPU, DB query timing)
- [ ] Structured logging with correlation IDs per request
- [ ] Secrets scrubbing in logs (passwords, tokens, API keys)
- [ ] PII redaction middleware for logging and error reporting

### 11. Testing

- [ ] Integration test helpers (DB setup/teardown, API test client)
- [ ] E2E test setup (Playwright)
- [ ] Component test examples
- [ ] Mock service patterns
- [ ] Test coverage configuration
- [ ] Security test suite (OWASP Top 10 scenarios, auth bypass, injection, XSS)
- [ ] Fuzz testing utilities for API endpoints
- [ ] Dependency vulnerability testing in CI

### 12. CI/CD & Deployment

- [ ] GitHub Actions CI (lint, typecheck, test, build)
- [ ] Docker multi-stage build (prod)
- [ ] Migration run in deploy pipeline
- [ ] Health check endpoint for orchestrators
- [ ] One-command deploy to Vercel / Railway / Fly.io
- [ ] Secret scanning in CI (e.g. GitGuardian / truffleHog)
- [ ] Dependency vulnerability scanning (Dependabot / Renovate / Snyk)
- [ ] SAST integration (CodeQL, Semgrep, SonarQube)
- [ ] Container image vulnerability scanning (Trivy / Grype)
- [ ] SBOM generation for supply chain transparency

### 13. Documentation & DX

- [ ] `getting-started.md` tutorial
- [ ] Architecture decision records (ADR)
- [ ] API reference (auto-generated from code)
- [ ] Video / interactive tutorial
- [ ] VSCode extension (snippets, commands)
- [ ] Examples directory (todo app, blog, SaaS starter)
- [ ] Security best practices guide
- [ ] Threat model documentation

### 14. Plugin / Extension System

- [ ] Plugin lifecycle hooks (beforeRequest, afterResponse, onBoot, etc.)
- [ ] Plugin npm packages (`@velajs/plugin-*`)
- [ ] Plugin configuration UI
- [ ] Registry / marketplace concept
- [ ] Plugin sandboxing / isolation for safe third-party execution
- [ ] Plugin permission model (capabilities declaration)
- [ ] Security review checklist for community plugins

### 15. Missing Core Modules

- [ ] **Search** — Full-text search abstraction (Postgres tsvector or Meilisearch/Algolia adapter)
- [ ] **Notifications** — In-app + push + email notification system
- [ ] **Audit log** — Record changes to entities
- [ ] **Feature flags** — Toggle features per environment/user
- [ ] **CSV/Export** — Data export utilities
- [ ] **Webhooks** — Outgoing webhook delivery system
- [ ] **Encryption service** — Symmetric/asymmetric encryption for sensitive data at rest
- [ ] **Secret management** — Vault integration or encrypted env-based secret store
- [ ] **CSRF token generation/validation** — Per-session and per-request tokens
- [ ] **Signed URLs / tokens** — HMAC-based URL signing for expiring access

### 16. Security Hardening (cross-cutting)

- [ ] Security headers baseline (CSP, HSTS, X-Frame-Options, Permissions-Policy) — partially exists
- [ ] TLS / HTTPS enforcement in production
- [ ] API-wide input sanitization pipeline (strip/escape untrusted input)
- [ ] Rate limiting at gateway level (global + per-route + per-user)
- [ ] Brute-force protection (account lockout, progressive delays)
- [ ] IP allowlist/blocklist middleware for admin endpoints
- [ ] Security event logging and alerting (failed auth, suspicious activity)
- [ ] Secrets rotation strategy and tooling
- [ ] Data retention and purging policies (GDPR compliance)
- [ ] Penetration testing guide and checklist

### 17. Naming & Package Structure

Current inconsistencies:
- `package.json`: `"name": "velajs"`
- `README.md`: `velajs`
- `src/cli/index.ts` output: `vorajs CLI`
- Directory: `velajs`
- User calls it `@velajs`

**Needed**: Pick one name (`@velajs`), rename everything, set up npm org, publish as scoped package.

---

## Priority Matrix

| Tier | Items |
|---|---|
| **P0 (ship-blocking)** | Consistent naming, real auth, API error envelope, request validation middleware, CORS, CSRF, CI pipeline, vulnerability scanning |
| **P1 (core experience)** | Working job queue, file upload, email, security headers, rate limiting, CSP, more UI components, `velajs` CLI, docs site |
| **P2 (polish)** | Form library, data fetching patterns, observability, secrets scrubbing, encryption service, testing infra, i18n, search |
| **P3 (ecosystem)** | Plugin system with sandboxing, webhooks, audit log, feature flags, VSCode extension, marketplace, penetration testing |
