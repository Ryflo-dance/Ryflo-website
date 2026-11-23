import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HoopCursor } from "@/components/layout/HoopCursor";
import { IntroLoader, introBootScript } from "@/components/layout/IntroLoader";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ryflo — Find Your Flow | Holographic Hoop Tapes by Ryana Singh",
    template: "%s · Ryflo",
  },
  description: site.description,
  keywords: [
    "hula hoop tape",
    "holographic hoop tape",
    "hula hoop India",
    "hula hoop classes",
    "hoop performer",
    "Ryana Singh",
    "India Book of Records",
    "Ryflo",
  ],
  openGraph: {
    type: "website",
    siteName: "Ryflo",
    title: "Ryflo — Find Your Flow",
    description: site.description,
    images: [{ url: "/assets/ryana/record/ryana-record-certificate.webp", width: 1800, height: 1286 }],
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FADCF0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${bodoni.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <noscript>
          <style>{`.intro-overlay{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-wine focus:px-5 focus:py-3 focus:text-blush"
        >
          Skip to content
        </a>
        <CartProvider>
          <IntroLoader />
          <HoopCursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
