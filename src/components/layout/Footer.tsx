import Link from "next/link";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { nav, site, whatsappLink } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Hoop } from "@/components/ui/Hoop";

export function Footer() {
  const wa = whatsappLink("Hi Ryana! I found Ryflo and would love to know more.");
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-wine text-blush">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 w-[520px] opacity-25">
        <Hoop thickness={5} speed={20} seams={false} />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-4 pb-10 pt-20 sm:px-6 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-[clamp(4rem,10vw,7rem)] text-blush" />
            <p className="mt-4 max-w-sm font-serif text-2xl italic text-blush/85">Find your flow.</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-blush/70">
              Holographic hoop tapes, hula hoop classes and live performances — from the world of {site.founder}.
            </p>
          </div>
          <div>
            <p className="eyebrow text-blush/50">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-blush/85 underline-offset-4 transition hover:text-blush hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-blush/50">Say hello</p>
            <ul className="mt-5 space-y-3 text-blush/85">
              <li>
                <Link href="/contact" className="underline-offset-4 hover:underline">
                  Send an enquiry
                </Link>
              </li>
              <li>
                <Link href="/classes#enquire" className="underline-offset-4 hover:underline">
                  Learn with Ryana
                </Link>
              </li>
              <li>
                <Link href="/performances#book" className="underline-offset-4 hover:underline">
                  Book a performance
                </Link>
              </li>
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 hover:underline">
                    <Mail className="h-4 w-4" /> {site.contact.email}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </li>
              )}
              {site.contact.instagram && (
                <li>
                  <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
                    <AtSign className="h-4 w-4" /> Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-blush/15 pt-6 text-xs text-blush/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ryflo. All rights reserved.</p>
          <p className="font-serif text-sm italic">With love, Ryana.</p>
        </div>
      </div>
    </footer>
  );
}
