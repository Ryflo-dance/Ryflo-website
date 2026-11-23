/**
 * Site-wide settings. Anything left `null` is hidden in the UI until it is filled in.
 * TODO(Ryana): add approved business contact details.
 */
export const site = {
  name: "Ryflo",
  tagline: "Find Your Flow",
  founder: "Ryana Singh",
  description:
    "Ryflo is the hooping world of Ryana Singh — India Book of Records holder, hula hoop performer and teacher. Shop holographic hoop tapes, learn to hoop, or book Ryana for your event.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ryflo.in",
  contact: {
    email: null as string | null, // e.g. "hello@ryflo.in"
    whatsapp: null as string | null, // international format without +, e.g. "919999999999"
    instagram: null as string | null, // e.g. "https://instagram.com/ryflo"
    city: null as string | null,
  },
  shipping: {
    // Shown on product pages. Replace with the real policy once confirmed.
    note: "Shipping across India. Delivery timelines and charges are confirmed at checkout.",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Meet Ryana" },
  { href: "/shop", label: "Shop" },
  { href: "/classes", label: "Classes" },
  { href: "/performances", label: "Performances" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function whatsappLink(message: string) {
  if (!site.contact.whatsapp) return null;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
