"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { customerSchema } from "@/lib/checkout";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { EmptyCart } from "./CartView";

type RazorpayHandlerResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: () => void) => void };
  }
}

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const FIELDS = [
  { name: "name", label: "Full name", autoComplete: "name", half: true },
  { name: "email", label: "Email", autoComplete: "email", type: "email", half: true },
  { name: "phone", label: "Mobile number", autoComplete: "tel", type: "tel", half: true },
  { name: "pincode", label: "PIN code", autoComplete: "postal-code", inputMode: "numeric", half: true },
  { name: "address1", label: "Address", autoComplete: "address-line1" },
  { name: "address2", label: "Apartment, landmark (optional)", autoComplete: "address-line2", optional: true },
  { name: "city", label: "City", autoComplete: "address-level2", half: true },
  { name: "state", label: "State", autoComplete: "address-level1", half: true },
] as const;

export function CheckoutView() {
  const uid = useId();
  const router = useRouter();
  const { lines, subtotal, ready, clear } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "working" | "not-live" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!ready) return <div className="h-[50vh]" aria-busy="true" />;
  if (lines.length === 0) return <EmptyCart />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = customerSchema.safeParse(raw);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const i of parsed.error.issues) fe[String(i.path[0])] ??= i.message;
      setErrors(fe);
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(fe)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("working");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: lines.map(({ slug, qty, option }) => ({ slug, qty, option })), customer: parsed.data }),
      });
      const body = await res.json();
      if (body.error === "payments-not-configured") return setStatus("not-live");
      if (!body.ok) {
        if (body.fieldErrors) setErrors(body.fieldErrors);
        setMessage(body.error === "unavailable" ? "Something in your cart is no longer available." : "We couldn't start the payment. Please try again.");
        return setStatus("error");
      }
      if (!(await loadRazorpay()) || !window.Razorpay) {
        setMessage("The payment window couldn't load. Please check your connection and try again.");
        return setStatus("error");
      }
      const rzp = new window.Razorpay({
        key: body.keyId,
        order_id: body.orderId,
        amount: body.amount,
        currency: body.currency,
        name: "Ryflo",
        description: "Ryflo order",
        prefill: { name: parsed.data.name, email: parsed.data.email, contact: parsed.data.phone },
        theme: { color: "#580B1D" },
        handler: async (r: RazorpayHandlerResponse) => {
          const v = await fetch("/api/checkout/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) }).then((x) => x.json());
          if (v.ok) {
            sessionStorage.setItem("ryflo-last-order", JSON.stringify({ paymentId: v.paymentId, name: parsed.data.name, total: body.amount / 100 }));
            clear();
            router.push("/checkout/confirmation");
          } else {
            setMessage("We couldn't verify your payment. If money was deducted, please contact us with your payment reference.");
            setStatus("error");
          }
        },
        modal: { ondismiss: () => setStatus("idle") },
      });
      rzp.open();
    } catch {
      setMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
      <form onSubmit={onSubmit} noValidate>
        <h1 className="display text-[clamp(3rem,7vw,5.4rem)]">
          Check<em>out.</em>
        </h1>
        <p className="mt-3 text-wine/70">Shipping details</p>
        <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {FIELDS.map((f) => {
            const id = `${uid}-${f.name}`;
            const err = errors[f.name];
            return (
              <div key={f.name} className={"half" in f && f.half ? "" : "sm:col-span-2"}>
                <label htmlFor={id} className="eyebrow block text-[0.66rem] text-wine/70">
                  {f.label}
                </label>
                <input
                  id={id}
                  name={f.name}
                  type={"type" in f ? f.type : "text"}
                  inputMode={"inputMode" in f ? f.inputMode : undefined}
                  autoComplete={f.autoComplete}
                  required={!("optional" in f)}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? `${id}-err` : undefined}
                  className="field"
                />
                {err && (
                  <p id={`${id}-err`} className="mt-1.5 text-sm text-[#c0264a]">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {status === "not-live" && (
          <div role="alert" className="mt-10 rounded-[1.5rem] bg-blush p-6">
            <p className="display text-2xl">Online payments are almost ready.</p>
            <p className="mt-2 text-wine/75">
              We&apos;re still setting up secure payments, so this order has <strong>not</strong> been placed and nothing has
              been charged. Your cart is saved — or send us a message and we&apos;ll help you order directly.
            </p>
            <Link href="/contact" className="mt-4 inline-block font-semibold underline underline-offset-4">
              Contact Ryflo
            </Link>
          </div>
        )}
        {status === "error" && (
          <p role="alert" className="mt-8 rounded-2xl border border-[#c0264a]/30 bg-[#c0264a]/5 p-5 text-sm">
            {message}
          </p>
        )}

        <Button type="submit" size="lg" className="mt-10 w-full sm:w-auto" disabled={status === "working"}>
          {status === "working" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Preparing payment…
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" /> Pay {formatINR(subtotal)}
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-wine/55">Payments are processed securely by Razorpay. Shipping is confirmed with your order.</p>
      </form>

      <aside className="h-fit rounded-[2rem] bg-blush p-8 lg:sticky lg:top-28">
        <h2 className="display text-3xl">Order summary</h2>
        <ul className="mt-6 space-y-4">
          {lines.map((l) => (
            <li key={l.slug + (l.option ?? "")} className="flex items-center gap-4">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <Image src={l.product.images[0].src} alt="" width={l.product.images[0].width} height={l.product.images[0].height} sizes="56px" className="h-full w-full object-cover" />
                <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-wine text-[0.65rem] font-bold text-blush">{l.qty}</span>
              </span>
              <span className="flex-1">{l.product.name}</span>
              <span className="font-semibold">{formatINR((l.product.price ?? 0) * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-wine/20 pt-5 text-xl">
          <span>Total</span>
          <span className="font-semibold">{formatINR(subtotal)}</span>
        </div>
        <Link href="/cart" className="mt-4 block text-sm underline underline-offset-4">
          Edit cart
        </Link>
      </aside>
    </div>
  );
}
