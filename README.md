# Commerce Rules Engine

A commerce-focused rules engine built in TypeScript to evaluate orders against
promotion and eligibility rules. The system is designed as a small, modular
architecture with a pure rules core, a REST API, and a lightweight admin UI
used for testing and iteration.

This project is intended as a portfolio piece demonstrating backend,
full-stack, and systems thinking in a retail / e-commerce context.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////


## **Architecture Overview**

The project is intentionally split into three layers:

### `rules-core/`
Pure business logic implemented as a TypeScript library.

- No HTTP
- No UI
- No persistence
- Deterministic rule evaluation

This layer models **commerce decisions**, such as promotions and eligibility,
and can be tested independently.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////

### `backend-api/`
Node.js + Express REST API that exposes the rules engine.

Responsibilities:
- Accept structured order payloads
- Invoke the rules engine
- Return evaluation results over HTTP

Endpoints:
- `GET /health` – service health check
- `POST /evaluate` – evaluate an order against promotion rules

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////

### `admin-ui/`
Next.js (React + TypeScript) admin interface.

This is an **internal tooling UI**, not a customer-facing storefront.
It allows:
- Building realistic order payloads
- Toggling customer context (e.g. membership)
- Sending requests to `/evaluate`
- Viewing results and raw JSON responses

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////


## **Local Setup**

### Prerequisites
- Node.js 18+
- npm

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////

### 1) rules-core (optional local test)
```bash
cd rules-core
npm install
npx ts-node src/test.ts
