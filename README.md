# Ryflo — Find Your Flow

The website for **Ryflo**, the hoop-tape brand founded by hula hoop performer and India Book of Records holder **Ryana Singh**.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

| What | File |
| --- | --- |
| Products, prices, stock, tape colours for the hoop preview | `src/content/products.ts` |
| Story chapters, record details, milestones, archive | `src/content/story.ts` |
| Class offerings, event types, performance reel | `src/content/services.ts` |
| Gallery items and filters | `src/content/gallery.ts` |
| Contact details (email, WhatsApp, Instagram), shipping note | `src/content/site.ts` |
| Logo (swap in the official file) | `src/components/ui/Logo.tsx` |
| The recurring animated hoop | `src/components/ui/Hoop.tsx` |
| Images & videos (optimised from the source shoot) | `public/assets/**` |

Any contact field left `null` in `site.ts` is hidden on the site. Search for `TODO(Ryana)` for content that needs confirming.

To add an image: export it to `public/assets/<folder>/<name>.webp` and add its `[width, height]` to `src/content/image-sizes.json`, then reference it with `img("<folder>/<name>", "alt text")`.

## Integrations (environment variables)

| Feature | Variables | Behaviour without them |
| --- | --- | --- |
| Enquiry emails (classes, bookings, contact) via [Resend](https://resend.com) | `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, optional `ENQUIRY_FROM_EMAIL` | Dev: saved to `.data/enquiries.jsonl`. Production: form says enquiries aren't switched on yet — no fake success. |
| Payments via Razorpay | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Checkout explains payments aren't live; nothing is charged or "placed". |
| Canonical URL for SEO | `NEXT_PUBLIC_SITE_URL` | Defaults to `https://ryflo.in`. |

Razorpay flow: `POST /api/checkout` prices the cart on the server and creates an order → Razorpay Checkout opens → `POST /api/checkout/verify` checks the signature → `/checkout/confirmation`.
Still to do before taking real orders: shipping charges (`priceCart` in `src/lib/checkout.ts`), order storage, and customer confirmation emails.
