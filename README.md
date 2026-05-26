### Hexlet tests and linter status:
[![Actions Status](https://github.com/algins/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/algins/ai-for-developers-project-386/actions)

## Project Overview

This repository contains:

- API contract in TypeSpec (`main.tsp`)
- generated OpenAPI spec (`tsp-output/schema/openapi.yaml`)
- separate frontend app (`frontend/`) built against the API contract

All common workflows are encapsulated in the root `Makefile`.

### Requirements

- Node.js 22 LTS or newer
- npm

## Quick Start

1. Install all dependencies:

```bash
make setup
```

2. Generate API docs and frontend types:

```bash
make frontend-sync
```

3. Start frontend with mock API (Prism + Vite):

```bash
make frontend-start
```

4. Open the app in browser:

- http://localhost:5173/

## Development Workflow

### 1) Setup

Install dependencies for root and frontend:

```bash
make setup
```

### 2) API Contract Work

Compile TypeSpec once:

```bash
make docs
```

Run both steps in one command:

```bash
make frontend-sync
```

### 3) Run the App

Run frontend and Prism together:

```bash
make frontend-start
```

### 4) See Results in Browser

When `make frontend-start` is running, open:

- http://localhost:5173/

Main routes:

- Public flow: `/`
- Event booking page: `/event-types/:eventTypeId`
- Admin owner: `/admin/owner`
- Admin event types: `/admin/event-types`
- Admin bookings: `/admin/bookings`

### 5) Make Changes

Typical loop while editing contract + frontend:

1. Edit `main.tsp` (or frontend code in `frontend/src`).
2. Rebuild contract and frontend types:

```bash
make frontend-sync
```

3. Keep app running with:

```bash
make frontend-start
```

4. Refresh browser and verify behavior.

### 6) Validate Before Commit

Run frontend checks:

```bash
make frontend-check
```

## Environment

Frontend environment template:

- `frontend/.env.example`

Main variable:

- `VITE_API_BASE_URL` (default in local setup: `http://localhost:4010`)

## Useful Commands

Show all available make targets:

```bash
make help
```

Generated OpenAPI files are written to `tsp-output/schema/`.