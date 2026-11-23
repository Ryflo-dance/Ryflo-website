import { NextResponse } from "next/server";
import { checkoutSchema, paymentsConfigured, priceCart } from "@/lib/checkout";

/**
 * Creates a Razorpay order for the cart.
 * Requires RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET. Until both are set this
 * endpoint answers 503 and the checkout UI says payments aren't live yet.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path.at(-1))] ??= i.message;
    return NextResponse.json({ ok: false, error: "invalid", fieldErrors }, { status: 422 });
  }

  let priced;
  try {
    priced = priceCart(parsed.data.lines);
  } catch {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 409 });
  }

  if (!paymentsConfigured()) {
    return NextResponse.json({ ok: false, error: "payments-not-configured", total: priced.total }, { status: 503 });
  }

  const { customer } = parsed.data;
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: priced.total * 100, // paise
      currency: "INR",
      receipt: `ryflo_${Date.now()}`,
      notes: {
        customer: `${customer.name} <${customer.email}> ${customer.phone}`,
        address: [customer.address1, customer.address2, customer.city, customer.state, customer.pincode].filter(Boolean).join(", "),
        items: priced.items.map((i) => `${i.qty}x ${i.name}${i.option ? ` (${i.option})` : ""}`).join("; ").slice(0, 250),
      },
    }),
  });
  if (!res.ok) {
    console.error("[checkout] Razorpay order creation failed", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "gateway-error" }, { status: 502 });
  }
  const order = (await res.json()) as { id: string; amount: number; currency: string };
  return NextResponse.json({ ok: true, orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
}
