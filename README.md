# phono

Next.js App Router project foundation for reproducing the phono corporate
website from the approved design references.

## Stack

- Next.js 16.2.6
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4.2.1 with `@tailwindcss/postcss`
- ESLint 9 with `eslint-config-next`
- shadcn/Radix-compatible component setup
- `lucide-react`, `motion`, `tw-animate-css`
- `nodemailer` for contact mail handling

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Notes

- Local PNG files are design references only and must not be used as full-page
  implementation assets.
- Contact mail values should be provided through `.env.local` using
  `.env.example` as the template.
