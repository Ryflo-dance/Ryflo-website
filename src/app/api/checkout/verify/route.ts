import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { paymentsConfigured } from "@/lib/checkout";

const schema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

/** Verifies the Razorpay payment signature (order_id|payment_id signed with the key secret). */
export async function POST(req: Request) {
  if (!paymentsConfigured()) return NextResponse.json({ ok: false, error: "payments-not-configured" }, { status: 503 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  const expected = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(razorpay_signature);
  const valid = a.length === b.length && timingSafeEqual(a, b);
  if (!valid) return NextResponse.json({ ok: false, error: "signature-mismatch" }, { status: 400 });

  // TODO: persist the order and send a confirmation email once a database / email provider is chosen.
  return NextResponse.json({ ok: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id });
}
