# Slow Pour

A cozy, thoughtful coffee journal. Take your time. Taste the difference.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS v4, with a custom component and visual system
- Supabase (Postgres, Auth, Storage, Row Level Security)
- Nivo Radar for sensory profiles
- Vercel deployment target

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add your Supabase project URL and publishable/anon key to `.env.local`.

## Database

Apply `supabase/migrations/0001_initial_schema.sql` to a fresh Supabase project using the SQL Editor or Supabase CLI. The first migration establishes the personal-journal data model and owner-only RLS policies. Public community policies are intentionally not included yet.

## Current implementation slice
- Responsive, editorial dashboard shell
- Custom coffee mark and hand-authored navigation SVG icons
- Light-first visual system; dark theme tokens and toggle are the next UI foundation task
- Nivo sensory radar with illustrative sample data
- Supabase browser and server client factories
- Initial relational schema and private-by-default RLS policies

The dashboard content is sample presentation data, not yet connected to Supabase. Authentication flows and CRUD forms are the next implementation slice.

## Stylesheet organization

Styles are split by responsibility using CSS Modules: `src/components/styles/dashboard.module.css`, `sidebar.module.css`, `shell.module.css`, `toggle.module.css`, and `shared.module.css`. `src/app/globals.css` contains only Tailwind import, design tokens, and global resets. Keep page-specific styles beside their page/component module rather than adding them to the global stylesheet.
# SlowPour
