# vorajs

vorajs is a Django-inspired, TypeScript-native fullstack starter for building modular Next.js applications with PostgreSQL, Knex, Zod, and Tailwind CSS.

It favors visible code, explicit boundaries, and generator-driven productivity without hiding the application behind framework magic.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

## Core Commands

```bash
npm run make:app users
npm run make:resource products
npm run make:migration create_products_table
npm run db:migrate
```

## Architecture

```text
src/
  apps/          app modules with services, routes, validation, UI, tests
  core/          framework services such as config, db, auth, jobs, security
  shared/        cross-app utilities, types, validators, and UI primitives
  frontend/      Next.js app router, layouts, styles, and design system
  database/      migrations, seeds, factories, schema helpers
  cli/           generators and framework tooling
  tests/         shared test setup and integration tests
```

## Philosophy

- Convention over configuration
- Modular monolith by default
- Tailwind-first UI
- PostgreSQL and SQL visibility
- Thin abstractions
- Generated code is owned by the app

