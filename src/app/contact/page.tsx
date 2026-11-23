import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ryflo and Ryana — product questions, classes, performances and collaborations.",
};

const shortcuts = [
  { href: "/classes#enquire", label: "Class enquiries" },
  { href: "/performances#book", label: "Performance bookings" },
  { href: "/shop", label: "Shop the tapes" },
];

export default function ContactPage() {
  const wa = whatsappLink("Hi Ryana! I found Ryflo and would love to know more.");
  return (
    <>
      <PageHeader eyebrow="Contact" title="Say hello," accent="let's flow." intro="Questions about an order, a collaboration idea, or just want to talk hoops? We'd love to hear from you." />
      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <aside className="space-y-10">
            <div>
              <p className="eyebrow text-rose">Looking for something specific?</p>
              <ul className="mt-5 divide-y divide-wine/15 border-y border-wine/15">
                {shortcuts.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="group flex items-center justify-between py-5">
                      <span className="display text-3xl group-hover:italic">{s.label}</span>
                      <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {(site.contact.email || wa) && (
              <div className="space-y-3">
                <p className="eyebrow text-rose">Direct</p>
                {site.contact.email && (
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-lg underline-offset-4 hover:underline">
                    <Mail className="h-5 w-5" /> {site.contact.email}
                  </a>
                )}
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg underline-offset-4 hover:underline">
                    <MessageCircle className="h-5 w-5" /> WhatsApp
                  </a>
                )}
              </div>
            )}
          </aside>
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}
