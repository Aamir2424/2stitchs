This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin production ticket (`/admin`)

`/admin` is password protected on the server. It needs three server environment variables;
without them the page only shows "ADMIN ACCESS IS NOT CONFIGURED." Never commit their values.

| Variable | Value |
| --- | --- |
| `ADMIN_PASSWORD_HASH` | Output of `node scripts/hash-admin-password.mjs` (asks for the password, at least 12 characters). |
| `ADMIN_SESSION_SECRET` | Random secret of at least 32 bytes, e.g. `openssl rand -base64 48`. Changing it logs everyone out. |
| `ORDERS_DIR` | Directory holding one `<order-id>.json` per submitted order (interim store until a database exists). |

The session cookie is `Secure` in production, so the site must be served over HTTPS.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
