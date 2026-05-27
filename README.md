# Refyne Data Platform UI

Internal ops dashboard for Refyne Search platform at **data.refynedata.com**.

Shows cross-org aggregate stats from the Refyne Search cache (same Supabase project as app.refynedata.com).

## Features

- **Overview**: Platform metrics (47K+ companies, 71% hit rate, cost savings)
- **Database**: Browse and search cached companies with filters
- **Verticals**: Industry coverage breakdown with progress bars
- **Ingestion**: CSV upload interface (coming soon)
- **Operations**: Background job triggers and monitoring (coming soon)
- **Research**: Single company lookup and debug enrichment data

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Refyne Design System** (Inline styles, navy #09090B, indigo #6366F1)
- **Clerk** (Team authentication)
- **Supabase** (Service role key - cross-org queries)
- **Lucide React** (Icons)

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

1. Copy \`.env.local.example\` to \`.env.local\`
2. Add your Clerk keys (from Clerk dashboard)
3. Add Supabase URL and service role key (from Supabase Settings → API)
4. **WARNING:** Never expose \`SUPABASE_SERVICE_ROLE_KEY\` client-side

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

## API Routes

| Route | Description | Key Tables |
|-------|-------------|------------|
| GET /api/stats | Overview page stat cards | refyne_company_cache, refyne_search_usage |
| GET /api/activity?limit=20 | Recent activity feed | refyne_company_cache, refyne_search_usage |
| GET /api/verticals | Coverage by industry | refyne_company_cache |
| GET /api/database?search=&vertical=&page=&pageSize= | Browse + filter cache | refyne_company_cache |
| GET /api/research?domain= | Single domain debug view | refyne_company_cache, refyne_search_usage |

## Auth Model

- All routes require valid Clerk \`userId\` (server-side check via \`auth()\`)
- Supabase queries use **service role key**, bypassing org-scoped RLS
- This is correct: dashboard shows **cross-org aggregate stats**
- Never expose service role key client-side

## Design System

- **Background**: \`#09090B\` (main background)
- **Sidebar**: \`#0E0E12\` (darker)
- **Surface**: \`#18181B\` (cards/panels)
- **Brand**: \`#6366F1\` (indigo)
- **Font**: Plus Jakarta Sans
- **Corners**: Borderless (0px) except cards (10-12px) and buttons (6-7px)

## Data Status

The \`refyne_company_cache\` table is currently empty (0 rows). All API routes will return zeroes and empty arrays until NPI seed data starts flowing in. The wiring is correct, the data just isn't there yet.
