# مؤسسة الأجنحة الحديثة

Luxury full-stack Umrah agency website for Moroccan travelers, built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, custom secure admin auth, Zod, React Hook Form, Framer Motion, and bilingual Arabic/French support with RTL.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Custom admin auth with signed HTTP-only cookies
- Zod validation
- React Hook Form
- Framer Motion
- next-intl

## Features

- Arabic-first public website with proper RTL and French secondary locale
- Homepage, packages listing, package details, about, contact, and FAQ pages
- Real booking request and contact submission flows saved to PostgreSQL
- Admin login and protected dashboard
- CRUD for packages, nested pricing groups and tiers, testimonials, FAQs, and site settings
- Booking request status updates
- SEO metadata, JSON-LD, sitemap, and robots support

## Seed Content

The seeded featured package uses the ad data you provided:

- Agency: `مؤسسة الأجنحة الحديثة`
- Package: `عمرة يناير`
- Dates: `13 January 2027` to `26 January 2027`
- Direct flight from Casablanca
- Editable room pricing tiers for `رباعية`, `ثلاثية`, and `ثنائية`
- Visa assistance, round-trip ticket, and accommodation inclusions
- Phone: `+212649898456`

Note: the ad image did not specify the year, so the seed uses **January 2027** as the next upcoming January window.

## Demo Admin Credentials

- Email: `admin@example.com`
- Password: `ChangeMe123!`

Change these immediately in any real deployment.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and update values:

```powershell
Copy-Item .env.example .env
```

3. Make sure PostgreSQL is running and the database in `DATABASE_URL` exists.

4. Generate Prisma client and create your schema:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

If you prefer a quick local push during development:

```bash
npm run db:push
```

5. Seed demo content:

```bash
npm run prisma:seed
```

6. Start the development server:

```bash
npm run dev
```

## Important Routes

### Public

- `/`
- `/packages`
- `/packages/omra-janvier`
- `/about`
- `/contact`
- `/faq`
- French versions under `/fr/...`

### Admin

- `/admin/login`
- `/admin`
- `/admin/packages`
- `/admin/packages/new`
- `/admin/packages/[id]/edit`
- `/admin/bookings`
- `/admin/contacts`
- `/admin/testimonials`
- `/admin/faqs`
- `/admin/settings`

## Environment Variables

See [.env.example](./.env.example).

- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_SITE_URL`: Base public URL used for metadata and sitemap
- `AUTH_SECRET`: Secret used to sign admin session tokens
- `NOTIFICATION_EMAIL_TO`: Inbox that receives booking and contact notifications
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: SMTP settings used to send notification emails
- `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_TOKEN_PATH`, `YOUTUBE_DEFAULT_PRIVACY`, `YOUTUBE_DEFAULT_CATEGORY`: local YouTube upload automation settings

## Email Notifications

Booking requests and contact submissions can notify:

- `hitmiadam96@gmail.com`

To enable real delivery, configure the SMTP variables in `.env` with your mail provider credentials, then restart the app.

## YouTube Automation

The repo includes a local OAuth + upload workflow for unattended YouTube uploads after a one-time authorization.

### Google Cloud setup

1. Create or reuse a Google Cloud project.
2. Enable the YouTube Data API v3.
3. Create an OAuth client for a desktop app.
4. Copy the client id into `.env` as `YOUTUBE_CLIENT_ID`.
5. If Google gives you a client secret for that desktop app, add it as `YOUTUBE_CLIENT_SECRET`.

### One-time authorization

Run:

```bash
npm run youtube:auth
```

The script prints a Google consent URL and starts a local loopback callback server. Open the URL, approve access, and the refresh token will be saved to `social-secrets/youtube-oauth.json`.

### Upload a video

Run:

```bash
npm run youtube:upload -- --file "C:\\Users\\SETUP GAME\\Videos\\automation-vids\\43.mp4" --title "8 Hidden DIY Tricks You'll Actually Use" --description "Smart DIY tricks for drilling, measuring, sealing, and fixing things faster."
```

Optional flags:

- `--description-file`
- `--tags "diy,life hacks,tool hacks"`
- `--privacy private|unlisted|public`
- `--category 22`
- `--notify-subscribers true|false`

Note: the official API supports `private`, `unlisted`, and `public` privacy states. It does not expose a separate YouTube Studio draft state.

## Project Structure

```text
app/
  [locale]/...          Public bilingual routes
  admin/...             Protected admin routes
  api/...               Route handlers for forms and admin CRUD
components/
  admin/...             Admin forms and actions
  forms/...             Public forms
  layout/...            Shared layout components
  sections/...          Marketing and content sections
  ui/...                Reusable UI primitives
lib/
  auth/...              Password and session utilities
  data/...              Query and transformation layer
  i18n/...              Locale routing and request config
  validations/...       Zod schemas
prisma/
  schema.prisma
  seed.ts
public/images/
  Local SVG assets
```

## Notes

- Public pages and admin pages are server-rendered with live database reads.
- Booking and contact forms validate on both client and server.
- The admin pricing editor lets staff rename tiers later if they want labels like Economy, Standard, Premium, or VIP.
