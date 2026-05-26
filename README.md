# Refyne Data Platform UI

Internal ops dashboard for Refyne Search platform at **data.refynedata.com**.

## Features

- **Overview**: Platform metrics (47K+ companies, 71% hit rate, cost savings)
- **Database**: Browse and search cached companies with filters
- **Verticals**: Industry coverage breakdown with progress bars
- **Ingestion**: CSV upload interface (coming soon)
- **Operations**: Background job triggers and monitoring (coming soon)
- **Research**: Single company lookup and debug enrichment data

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (Dark mode, navy #162944)
- **Clerk** (Team authentication)
- **Lucide React** (Icons)

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Clerk

1. Create a Clerk application at https://dashboard.clerk.com
2. Copy \`.env.local.example\` to \`.env.local\`
3. Add your Clerk keys

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

## Design System

- **Background**: \`#0a1628\` (dark navy)
- **Cards**: \`#162944\` (navy)
- **Corners**: Square (no border-radius)

## Mock Data

All pages currently use realistic mock data. Wire real APIs after platform backend is built.
