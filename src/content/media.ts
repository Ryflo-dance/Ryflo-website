import sizes from "./image-sizes.json";

export type Img = { src: string; width: number; height: number; alt: string };

const table = sizes as Record<string, number[]>;

/** Look up a processed image in /public/assets with its intrinsic size. */
export function img(path: string, alt: string): Img {
  const src = path.startsWith("/") ? path : `/assets/${path}.webp`;
  const size = table[src];
  if (!size) throw new Error(`Unknown image asset: ${src} — run the asset pipeline or add it to image-sizes.json`);
  return { src, width: size[0], height: size[1], alt };
}

export type Video = { src: string; poster: string; title: string; orientation: "portrait" | "landscape" };

export function video(name: string, title: string, orientation: Video["orientation"] = "portrait"): Video {
  return { src: `/assets/videos/${name}.mp4`, poster: `/assets/videos/${name}.jpg`, title, orientation };
}

export const videos = {
  heroLoop: video("hero-loop", "Ryana hooping on a rooftop at sunset"),
  rooftop: video("rooftop-flow", "Rooftop flow at sunset"),
  goldenHour: video("golden-hour-flow", "Golden hour flow"),
  studio: video("studio-flow", "Double hoops in the studio"),
  skates: video("skates-and-hoops", "Hooping on roller skates"),
  theSwitch: video("the-switch", "The switch"),
  flowArt: video("flow-art-event", "Flow art at a live event"),
  groupClass: video("group-class", "Group class in session", "landscape"),
  online1: video("online-class-1", "Online class"),
  online2: video("online-class-2", "Online class"),
  online3: video("online-class-3", "Online class"),
  online4: video("online-class-4", "Online class"),
};
