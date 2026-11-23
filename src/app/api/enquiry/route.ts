import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { enquirySchema, type Enquiry, type EnquiryResponse } from "@/lib/enquiry";

/**
 * Enquiry intake for classes, bookings and general contact.
 *
 * Delivery (in order):
 *  1. Email via Resend when RESEND_API_KEY + ENQUIRY_TO_EMAIL are set (ENQUIRY_FROM_EMAIL optional).
 *  2. In local development only: appended to .data/enquiries.jsonl so the flow can be tested.
 *  3. Otherwise: responds 503 "not-configured" — the UI never shows a success state it can't back up.
 */

const json = (body: EnquiryResponse, status = 200) => NextResponse.json(body, { status });

// naive per-instance rate limit
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

const labels: Record<Enquiry["kind"], string> = {
  class: "Class enquiry",
  booking: "Performance booking enquiry",
  contact: "General enquiry",
};

function toText(e: Enquiry) {
  return Object.entries(e)
    .filter(([k, v]) => k !== "company" && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function sendEmail(e: Enquiry) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "Ryflo <onboarding@resend.dev>",
      to: [process.env.ENQUIRY_TO_EMAIL],
      reply_to: e.email,
      subject: `${labels[e.kind]} — ${e.name}`,
      text: toText(e),
      html: `<pre style="font-family:system-ui">${escapeHtml(toText(e))}</pre>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return json({ ok: false, error: "rate-limited" }, 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid", fieldErrors: { form: "Malformed request" } }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json({ ok: false, error: "invalid", fieldErrors }, 422);
  }

  const enquiry = parsed.data;
  // Honeypot: pretend nothing happened, deliver nothing.
  if (enquiry.company) return json({ ok: false, error: "invalid", fieldErrors: { form: "Rejected" } }, 422);

  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) {
    try {
      await sendEmail(enquiry);
      return json({ ok: true, delivery: "email" });
    } catch (err) {
      console.error("[enquiry] email delivery failed", err);
      return json({ ok: false, error: "delivery-failed" }, 502);
    }
  }

  if (process.env.NODE_ENV === "development") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify({ at: new Date().toISOString(), ...enquiry }) + "\n");
    console.info(`[enquiry] DEV ONLY — saved ${enquiry.kind} enquiry to .data/enquiries.jsonl`);
    return json({ ok: true, delivery: "dev-log" });
  }

  return json({ ok: false, error: "not-configured" }, 503);
}
