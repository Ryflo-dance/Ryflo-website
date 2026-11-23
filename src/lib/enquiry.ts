import { z } from "zod";
import { classLocations, eventTypes, experienceLevels, classOfferings } from "@/content/services";

const phone = z
  .string()
  .trim()
  .min(7, "Please add a phone or WhatsApp number")
  .max(20, "That number looks too long")
  .regex(/^[+\d][\d\s()-]{6,}$/, "Please use digits, spaces or + only");

const base = {
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  email: z.string().trim().email("Please enter a valid email"),
  message: z.string().trim().max(2000, "Please keep it under 2000 characters").optional().default(""),
  // honeypot — real people never fill this in
  company: z.string().max(0).optional().default(""),
};

export const classEnquiry = z.object({
  kind: z.literal("class"),
  ...base,
  phone,
  classType: z.enum(classOfferings.map((c) => c.id) as [string, ...string[]], { message: "Choose a class type" }),
  level: z.enum(experienceLevels, { message: "Choose your experience level" }),
  location: z.enum(classLocations, { message: "Choose a preference" }),
});

export const bookingEnquiry = z.object({
  kind: z.literal("booking"),
  ...base,
  phone,
  eventType: z.enum(eventTypes, { message: "Choose an event type" }),
  eventDate: z
    .string()
    .min(1, "Please add a date")
    .refine((d) => !Number.isNaN(Date.parse(d)) && new Date(d) >= new Date(new Date().toDateString()), "Choose a date in the future"),
  location: z.string().trim().min(2, "Where is the event?").max(120),
  audience: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(10, "Tell us a little about the event").max(2000),
});

export const contactEnquiry = z.object({
  kind: z.literal("contact"),
  ...base,
  phone: z.string().trim().max(20).optional().default(""),
  subject: z.enum(["Order or product question", "Classes", "Performances", "Collaboration", "Something else"], {
    message: "Choose a topic",
  }),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

export const enquirySchema = z.discriminatedUnion("kind", [classEnquiry, bookingEnquiry, contactEnquiry]);
export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryKind = Enquiry["kind"];

export type EnquiryResponse =
  | { ok: true; delivery: "email" | "dev-log" }
  | { ok: false; error: "invalid"; fieldErrors: Record<string, string> }
  | { ok: false; error: "not-configured" | "delivery-failed" | "rate-limited" };
