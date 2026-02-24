# REST API with Node.js

A REST API example built with Fastify, Knex.js, SQLite, and Zod.

## Tech Stack

- **Runtime:** Node.js with TypeScript (ESM)
- **Framework:** Fastify v5
- **Database:** SQLite via Knex.js query builder
- **Validation:** Zod for environment variables and request schemas
- **Dev tools:** tsx (watch mode), ESLint

## Prerequisites

- Node.js >= 18
- npm

## Setup

```bash
# Install dependencies
npm install

# Create your .env file from the example
cp .env.example .env

# Run database migrations
npm run knex -- migrate:latest

# Start the dev server (with hot reload)
npm run dev
```

The server starts at `http://localhost:3333` by default.

## Environment Variables

| Variable         | Description       | Default        | Options                            |
| ---------------- | ----------------- | -------------- | ---------------------------------- |
| `NODE_ENV`       | App environment   | `production`   | `development`, `test`, `production`|
| `DATABASE_CLIENT`| DB driver         | `sqlite`       | `sqlite`, `pg`                     |
| `DATABASE_URL`   | DB connection     | —              | File path (SQLite) or connection string (pg) |
| `PORT`           | Server port       | `3333`         | Any valid port number              |

## Scripts

| Command                          | Description                    |
| -------------------------------- | ------------------------------ |
| `npm run dev`                    | Start dev server with watch    |
| `npm run knex -- migrate:latest` | Run pending migrations         |
| `npm run knex -- migrate:make <name>` | Create a new migration    |
| `npm run lint`                   | Lint source files with ESLint  |

## Database Schema

### transactions

| Column       | Type            | Constraints              |
| ------------ | --------------- | ------------------------ |
| `id`         | UUID            | Primary key              |
| `session_id` | UUID            | Indexed                  |
| `title`      | TEXT            | Not null                 |
| `amount`     | DECIMAL(10, 2)  | Not null                 |
| `created_at` | TIMESTAMP       | Not null, default: now() |

## Project Structure

```
├── src/
│   ├── server.ts          # Fastify app, routes, and startup
│   ├── database.ts        # Knex instance and config
│   └── env/
│       └── index.ts       # Zod env validation
├── db/
│   └── migrations/        # Knex migration files
├── knexfile.ts            # Knex CLI config
├── tsconfig.json
└── package.json
```
