# Frontend (Contract-Driven)

Frontend is implemented as a separate app in this folder and works only through API contract endpoints from `../tsp-output/schema/openapi.yaml`.

## Requirements

- Node.js 22+
- npm

## Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

## Environment

- `VITE_API_BASE_URL` - backend URL (or Prism mock), default `http://localhost:4010`

## Scripts

- `npm run dev` - start frontend only
- `npm run prism:mock` - start Prism mock from TypeSpec OpenAPI
- `npm run dev:with-mock` - start Prism + frontend together
- `npm run generate:types` - regenerate TypeScript types from OpenAPI
- `npm run typecheck` - TypeScript checks
- `npm run lint` - ESLint checks
- `npm run build` - production build
- `npm run preview` - preview built app

## API Coverage

Public:

- `GET /event-types`
- `GET /event-types/{eventTypeId}/slots`
- `POST /bookings`

Admin:

- `GET /admin/owner`
- `POST /admin/event-types`
- `GET /admin/bookings/upcoming`

## UI Stack

- React + TypeScript + Vite
- shadcn/ui
- TanStack Query
- react-hook-form + zod
- Axios

## Notes

- Generated OpenAPI types are written to `src/types/api.generated.ts`.
- App-level type aliases are in `src/types/api.ts`.
