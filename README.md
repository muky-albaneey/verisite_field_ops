# Verisite Field Ops Dashboard

Next.js 14 App Router application with Tailwind CSS for Field Operations management.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Dashboard States

The dashboard supports four different states via query parameters:

- `/en/dashboard?state=pending` - Pending verification state
- `/en/dashboard?state=verified_toast` - Just verified with toast notification
- `/en/dashboard?state=verified_empty` - Verified with no assignments (default)
- `/en/dashboard?state=has_assignments` - Verified with assignments and KPIs

## Project Structure

- `app/[locale]/(field-ops)/` - Field Ops route group with locale support
- `components/field-ops/` - Field Ops specific components
- `components/ui/` - Reusable UI components

