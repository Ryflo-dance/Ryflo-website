"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, MessageCircle } from "lucide-react";
import { classLocations, classOfferings, eventTypes, experienceLevels } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import { enquirySchema, type EnquiryKind, type EnquiryResponse } from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { Hoop } from "@/components/ui/Hoop";
import { Sparkles } from "@/components/ui/Sparkles";
import { cn } from "@/lib/format";

type FieldDef =
  | { name: string; label: string; type: "text" | "email" | "tel" | "date"; required?: boolean; autoComplete?: string; placeholder?: string; half?: boolean }
  | { name: string; label: string; type: "select"; options: readonly { value: string; label: string }[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string };

const opts = (xs: readonly string[]) => xs.map((x) => ({ value: x, label: x }));

const FIELDS: Record<EnquiryKind, FieldDef[]> = {
  class: [
    { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name", half: true },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, autoComplete: "tel", half: true },
    { name: "classType", label: "Class or workshop", type: "select", required: true, options: classOfferings.map((c) => ({ value: c.id, label: c.title })), half: true },
    { name: "level", label: "Experience level", type: "select", required: true, options: opts(experienceLevels), half: true },
    { name: "location", label: "In person or online?", type: "select", required: true, options: opts(classLocations), half: true },
    { name: "message", label: "Anything else Ryana should know?", type: "textarea", placeholder: "Age of the learner, goals, preferred days…" },
  ],
  booking: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", half: true },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "phone", label: "Contact number", type: "tel", required: true, autoComplete: "tel", half: true },
    { name: "eventType", label: "Event type", type: "select", required: true, options: opts(eventTypes), half: true },
    { name: "eventDate", label: "Event date", type: "date", required: true, half: true },
    { name: "location", label: "Event location", type: "text", required: true, placeholder: "City / venue", half: true },
    { name: "audience", label: "Expected audience size (optional)", type: "text", placeholder: "e.g. 150 guests", half: true },
    { name: "message", label: "Event details", type: "textarea", required: true, placeholder: "The occasion, the vibe, performance length, stage or space…" },
  ],
  contact: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", half: true },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel", half: true },
    {
      name: "subject",
      label: "Topic",
      type: "select",
      required: true,
      half: true,
      options: opts(["Order or product question", "Classes", "Performances", "Collaboration", "Something else"]),
    },
    { name: "message", label: "Message", type: "textarea", required: true },
  ],
};

const SUBMIT: Record<EnquiryKind, string> = { class: "Learn with Ryana", booking: "Submit enquiry", contact: "Send message" };
const SUCCESS: Record<EnquiryKind, { title: string; text: string }> = {
  class: { title: "Your flow starts soon.", text: "Thank you! Ryana has your class enquiry and will get back to you personally." },
  booking: { title: "Let's make it unforgettable.", text: "Thank you! Your booking enquiry is in — Ryana will be in touch to talk details." },
  contact: { title: "Message received.", text: "Thank you for reaching out — we'll reply as soon as we can." },
};

export function EnquiryForm({
  kind,
  defaults = {},
  queryDefaults,
  className,
}: {
  kind: EnquiryKind;
  defaults?: Record<string, string>;
  /** Pre-fill fields from the URL, e.g. { type: "classType" } reads ?type=… into classType. */
  queryDefaults?: Record<string, string>;
  className?: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!queryDefaults || !formRef.current) return;
    const q = new URLSearchParams(window.location.search);
    for (const [param, field] of Object.entries(queryDefaults)) {
      const v = q.get(param);
      const el = formRef.current.elements.namedItem(field) as HTMLSelectElement | HTMLInputElement | null;
      if (v && el && (!(el instanceof HTMLSelectElement) || [...el.options].some((o) => o.value === v))) el.value = v;
    }
  }, [queryDefaults]);
  // date pickers can't go into the past (set after mount so the page stays static)
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    formRef.current?.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach((d) => (d.min = today));
  }, []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [failure, setFailure] = useState<string>("");
  const [delivery, setDelivery] = useState<"email" | "dev-log">("email");
  const wa = whatsappLink("Hi Ryana! I'd like to make an enquiry.");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { kind, ...Object.fromEntries(new FormData(form).entries()) };
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const i of parsed.error.issues) fe[String(i.path[0])] ??= i.message;
      setErrors(fe);
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(fe)[0]}"]`);
      first?.focus();
      return;
    }
    setErrors({});
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as EnquiryResponse;
      if (body.ok) {
        setDelivery(body.delivery);
        setState("done");
        return;
      }
      if (body.error === "invalid") {
        setErrors(body.fieldErrors);
        setState("idle");
        return;
      }
      setFailure(
        body.error === "not-configured"
          ? "Online enquiries aren't switched on just yet."
          : body.error === "rate-limited"
            ? "That's a lot of enquiries in a short time — please try again in a few minutes."
            : "Something went wrong sending your enquiry.",
      );
      setState("failed");
    } catch {
      setFailure("We couldn't reach the server. Please check your connection and try again.");
      setState("failed");
    }
  }

  if (state === "done") {
    const s = SUCCESS[kind];
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("relative flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-blush px-6 py-16 text-center", className)}
      >
        <Sparkles />
        <motion.div
          className="w-40"
          initial={{ rotate: -180, scale: 0.4 }}
          animate={{ rotate: 0, scale: [0.4, 1.15, 1] }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hoop speed={1.2} thickness={12} tilt={50} />
        </motion.div>
        <h3 className="display mt-6 text-4xl md:text-5xl">{s.title}</h3>
        <p className="mt-4 max-w-md text-wine/75">{s.text}</p>
        {delivery === "dev-log" && (
          <p className="mt-4 rounded-full bg-ivory px-4 py-1.5 text-xs text-wine/70">
            Development mode: saved to .data/enquiries.jsonl — no email was sent.
          </p>
        )}
        <Button variant="outline" className="mt-8" onClick={() => setState("idle")}>
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn("relative", className)} aria-describedby={`${uid}-req`}>
      <p id={`${uid}-req`} className="mb-6 text-xs text-wine/60">
        Fields marked * are required.
      </p>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {FIELDS[kind].map((f) => {
          const id = `${uid}-${f.name}`;
          const err = errors[f.name];
          const common = {
            id,
            name: f.name,
            required: f.required,
            "aria-invalid": err ? true : undefined,
            "aria-describedby": err ? `${id}-err` : undefined,
            className: "field",
            defaultValue: defaults[f.name],
          } as const;
          return (
            <div key={f.name} className={cn(f.type === "textarea" || !("half" in f && f.half) ? "sm:col-span-2" : "")}>
              <label htmlFor={id} className="eyebrow block text-[0.66rem] text-wine/70">
                {f.label}
                {f.required && <span aria-hidden> *</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea {...common} rows={4} placeholder={f.placeholder} className="field resize-y" />
              ) : f.type === "select" ? (
                <select {...common} defaultValue={defaults[f.name] ?? ""}>
                  <option value="" disabled>
                    Choose…
                  </option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  type={f.type}
                  autoComplete={"autoComplete" in f ? f.autoComplete : undefined}
                  placeholder={"placeholder" in f ? f.placeholder : undefined}
                />
              )}
              {err && (
                <p id={`${id}-err`} className="mt-1.5 text-sm text-[#c0264a]">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <AnimatePresence>
        {state === "failed" && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-2xl border border-[#c0264a]/30 bg-[#c0264a]/5 p-5 text-sm"
          >
            <p className="font-semibold">Your enquiry was not sent.</p>
            <p className="mt-1 text-wine/75">
              {failure}{" "}
              {site.contact.email || wa ? "You can also reach Ryana directly:" : "Please try again a little later."}
            </p>
            <div className="mt-3 flex flex-wrap gap-4">
              {site.contact.email && (
                <a className="underline" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              )}
              {wa && (
                <a className="inline-flex items-center gap-1.5 underline" href={wa} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            SUBMIT[kind]
          )}
        </Button>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium underline underline-offset-4">
            <MessageCircle className="h-4 w-4" /> Or message on WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}
