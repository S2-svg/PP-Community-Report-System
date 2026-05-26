# PP-Community-Report-System

Backend API for the Phnom Penh Community Reporting System.

## Run locally

```bash
npm install
npm run dev
```

Create a `.env` from `.env.example`, import `pp_crs_db.sql` into MySQL, then start the API.

Useful endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/reports`
- `GET /api/reports`
- `PATCH /api/reports/:id/status`
- `GET /api/categories`
- `GET /api/dashboard/report-summary`
