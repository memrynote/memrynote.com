# Memry — Website

Marketing site for [Memry](https://memrynote.com), the local-first PKM that unifies notes, tasks, journaling, and inbox in one private space.

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Routing | React Router v7 |
| Hosting | Vercel (serverless functions) |
| Waitlist | Resend Contacts API |

## Setup

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
```

### Development

```bash
# Option A: Vite only (waitlist API proxied via plugin)
npm run dev

# Option B: Full Vercel runtime (recommended)
vercel dev
```

### Production build

```bash
npm run build     # outputs to dist/
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for waitlist signups |
| `RESEND_SEGMENT_ID` | No | Resend segment to group waitlist contacts |

Set these in Vercel dashboard for preview/production, or in `.env.local` for local dev.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — hero, features, roadmap, pricing, FAQ |
| `/use-cases` | Persona-based use cases |
| `/features` | Detailed feature breakdown |
| `/pricing` | Pricing tiers |

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, Container
│   ├── sections/     # Hero, Features, Pricing, Roadmap, etc.
│   ├── shared/       # WaitlistForm, MockupFrame, SectionHeading
│   └── ui/           # Base UI primitives
├── pages/            # Route-level components
├── lib/              # Constants, utilities
└── hooks/            # Custom hooks
api/
└── waitlist.ts       # Vercel serverless — POST /api/waitlist
```

## Domains

- **memrynote.com** — primary
- **memrynote.ai** — 308 redirect → memrynote.com
- **www.\*** — 308 redirect → bare domain

Redirect rules live in `vercel.json`.

## License

Private. All rights reserved.
