import { z } from "zod";
import { getProduct, purchasable } from "@/content/products";

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Please add your full name").max(80),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Please enter a valid Indian mobile number"),
  address1: z.string().trim().min(5, "Please add your street address").max(160),
  address2: z.string().trim().max(160).optional().default(""),
  city: z.string().trim().min(2, "Please add your city").max(60),
  state: z.string().trim().min(2, "Please add your state").max(60),
  pincode: z.string().trim().regex(/^[1-9]\d{5}$/, "Please enter a 6-digit PIN code"),
});

export const checkoutSchema = z.object({
  lines: z
    .array(z.object({ slug: z.string(), qty: z.number().int().min(1).max(20), option: z.string().optional() }))
    .min(1, "Your cart is empty"),
  customer: customerSchema,
});
export type CheckoutRequest = z.infer<typeof checkoutSchema>;

/** Price a cart from the catalogue on the server — never trust client prices. */
export function priceCart(lines: CheckoutRequest["lines"]) {
  const items = lines.map((l) => {
    const p = getProduct(l.slug);
    if (!p || !purchasable(p) || p.price === null) throw new Error(`Unavailable product: ${l.slug}`);
    return { slug: p.slug, name: p.name, option: l.option, qty: l.qty, unit: p.price, total: p.price * l.qty };
  });
  const subtotal = items.reduce((n, i) => n + i.total, 0);
  // TODO(Ryana): add shipping charges once the shipping policy is confirmed.
  const shipping = 0;
  return { items, subtotal, shipping, total: subtotal + shipping };
}

export const paymentsConfigured = () => Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
