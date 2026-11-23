import { img, type Img } from "./media";

export type Finish = {
  /** Colours used by the hoop preview to simulate the tape. Representative only. */
  palette: [string, string, string, string];
  /** Tint of the specular streak. */
  shine: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "tapes" | "hoops";
  collections: ("featured" | "new")[];
  /** Price in INR. `null` = price on request / not yet set. */
  price: number | null;
  status: "in-stock" | "low-stock" | "sold-out" | "coming-soon";
  tagline: string;
  description: string;
  images: Img[];
  finish: Finish;
  /** Optional detail rows (width, length, material…). Only shown when filled in. */
  specs?: { label: string; value: string }[];
  options?: { name: string; values: string[] }[];
};

/**
 * Prices come from Ryana's product sheet (Nov 2026).
 * TODO(Ryana): confirm tape width/length, stock levels and the "Rainbow" photo.
 */
export const products: Product[] = [
  {
    slug: "lilac",
    name: "Lilac",
    category: "tapes",
    collections: ["featured"],
    price: 799,
    status: "in-stock",
    tagline: "Pearl-soft lilac with a cool silver shift.",
    description:
      "A dreamy, opalescent wrap that flickers between lilac, ice-blue and pearl as your hoop turns. Understated in daylight, quietly magical under stage lights.",
    images: [
      img("products/tapes/lilac-1", "Rolls of Lilac holographic hoop tape held in hand"),
      img("products/tapes/lilac-2", "Lilac tape catching aqua and pink reflections"),
    ],
    finish: { palette: ["#e9dcff", "#bfe3ff", "#ffd6f0", "#f5f0ff"], shine: "#ffffff" },
  },
  {
    slug: "bubblegum-pink",
    name: "Bubblegum Pink",
    category: "tapes",
    collections: ["featured"],
    price: 699,
    status: "in-stock",
    tagline: "Hot pink that melts into violet.",
    description:
      "Playful, punchy and unmistakably Ryflo. Bubblegum Pink flashes from candy pink to electric violet with every rotation.",
    images: [
      img("products/tapes/bubblegum-pink-1", "Bubblegum Pink holographic tape rolls"),
      img("products/tapes/bubblegum-pink-2", "Bubblegum Pink tape in soft daylight"),
    ],
    finish: { palette: ["#ff4fa3", "#b05cff", "#ff9bd0", "#6f7dff"], shine: "#ffe1f2" },
  },
  {
    slug: "cotton-candy",
    name: "Cotton Candy",
    category: "tapes",
    collections: ["new"],
    price: 699,
    status: "in-stock",
    tagline: "Peach, periwinkle and a sugar-spun glow.",
    description:
      "A sunset in a roll — warm peach melting into periwinkle and blush. Made for flowy, dreamy routines.",
    images: [img("products/tapes/cotton-candy-1", "Cotton Candy holographic tape with peach and periwinkle tones")],
    finish: { palette: ["#8f86f5", "#f7ad78", "#f4b5e0", "#8fd3f2"], shine: "#fff3e6" },
  },
  {
    slug: "kiwi-gold",
    name: "Kiwi Gold",
    category: "tapes",
    collections: ["new"],
    price: 699,
    status: "in-stock",
    tagline: "Golden glow with a fresh green shimmer.",
    description:
      "Warm gold that turns zesty green and coral as it catches the light. Bright, sunny and full of energy.",
    images: [
      img("products/tapes/kiwi-gold-1", "Kiwi Gold holographic tape rolls"),
      img("products/tapes/kiwi-gold-2", "Stack of Kiwi Gold tape with lime reflections"),
    ],
    finish: { palette: ["#d7e36a", "#f3b257", "#9ed6ae", "#ee8d86"], shine: "#fffbe0" },
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    category: "tapes",
    collections: ["featured"],
    price: 699,
    status: "in-stock",
    tagline: "Every colour, every spin.",
    description:
      "A full-spectrum holographic finish that throws colour in every direction. For hoopers who want to be seen from the back row.",
    images: [img("products/tapes/rainbow-1", "Rainbow holographic tape with blue and pink reflections")],
    finish: { palette: ["#6b7bff", "#ff6bb5", "#ffd56b", "#63e0c6"], shine: "#ffffff" },
  },
  {
    slug: "orange-pop",
    name: "Orange Pop",
    category: "tapes",
    collections: ["new"],
    price: 699,
    status: "in-stock",
    tagline: "Coral heat with a golden flash.",
    description:
      "Juicy coral and tangerine that glints gold at the edges. Pure joy on a sunny afternoon or under warm stage lights.",
    images: [
      img("products/tapes/orange-pop-1", "Orange Pop holographic tape in coral and pink"),
      img("products/tapes/orange-pop-2", "Orange Pop tape with golden tones"),
    ],
    finish: { palette: ["#ff5a50", "#ffb347", "#ff7fa9", "#ffd27a"], shine: "#fff0d6" },
  },
  {
    slug: "neon-lemon",
    name: "Neon Lemon",
    category: "tapes",
    collections: ["featured", "new"],
    price: 699,
    status: "in-stock",
    tagline: "Electric lime that pops under UV.",
    description:
      "Our boldest finish. Neon Lemon glows acid-green with flashes of orange — and really comes alive under blacklight.",
    images: [
      img("products/tapes/neon-lemon-2", "Neon Lemon holographic tape glowing green"),
      img("products/tapes/neon-lemon-1", "Neon Lemon tape glowing under UV light"),
    ],
    finish: { palette: ["#c4ff3a", "#5dff8a", "#f2ff73", "#ff9d57"], shine: "#f7ffd6" },
  },
  {
    slug: "custom-ryflo-hoop",
    name: "Custom Ryflo Hoop",
    category: "hoops",
    collections: [],
    price: null,
    status: "coming-soon",
    tagline: "A hoop wrapped in the Ryflo finish of your choice.",
    description:
      "Ready-to-flow hoops are on the way. Tell us what you are looking for and Ryana will get back to you personally.",
    images: [img("products/tapes/collection-stack-night", "A stack of Ryflo tapes in every colour")],
    finish: { palette: ["#ff6bb5", "#9a8cff", "#6be0c8", "#ffd56b"], shine: "#ffffff" },
  },
];

export const categories = [
  { id: "all", label: "Everything" },
  { id: "tapes", label: "Hoop Tapes" },
  { id: "hoops", label: "Hula Hoops" },
  { id: "featured", label: "Featured" },
  { id: "new", label: "New Arrivals" },
] as const;
export type CategoryId = (typeof categories)[number]["id"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function filterProducts(id: CategoryId) {
  if (id === "all") return products;
  if (id === "tapes" || id === "hoops") return products.filter((p) => p.category === id);
  return products.filter((p) => p.collections.includes(id));
}

export const purchasable = (p: Product) => p.price !== null && (p.status === "in-stock" || p.status === "low-stock");

export const statusLabel: Record<Product["status"], string> = {
  "in-stock": "In stock",
  "low-stock": "Only a few left",
  "sold-out": "Sold out",
  "coming-soon": "Coming soon",
};
