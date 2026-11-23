import { img, videos, type Img, type Video } from "./media";
import { archive } from "./story";

export type GalleryCategory = "performances" | "classes" | "record" | "archive";

export type GalleryItem =
  | { kind: "image"; id: string; category: GalleryCategory; image: Img; shape?: "circle" | "tall" | "wide" }
  | { kind: "video"; id: string; category: GalleryCategory; video: Video; shape?: "circle" | "tall" | "wide" };

export const galleryFilters: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "performances", label: "Performances" },
  { id: "classes", label: "Classes" },
  { id: "record", label: "The Record" },
  { id: "archive", label: "Archive" },
];

const i = (id: string, category: GalleryCategory, image: Img, shape?: "circle" | "tall" | "wide"): GalleryItem => ({
  kind: "image",
  id,
  category,
  image,
  shape,
});
const v = (id: string, category: GalleryCategory, video: Video, shape?: "circle" | "tall" | "wide"): GalleryItem => ({
  kind: "video",
  id,
  category,
  video,
  shape,
});

export const gallery: GalleryItem[] = [
  v("v-rooftop", "performances", videos.rooftop, "tall"),
  i("medal-kiss", "record", img("ryana/portraits/ryana-medal-kiss", "Ryana kissing her India Book of Records medal"), "circle"),
  v("v-flowart", "performances", videos.flowArt),
  i("teach-laugh", "classes", img("ryana/teaching/ryana-teaching-laugh", "Ryana laughing with a young student")),
  i("portrait-dark", "performances", img("ryana/portraits/ryana-studio-portrait", "Studio portrait of Ryana"), "circle"),
  i("record-kit", "record", img("ryana/record/record-kit", "India Book of Records certificate and medal")),
  v("v-golden", "performances", videos.goldenHour),
  i("group", "classes", img("ryana/teaching/group-class", "Group class with colourful hoops"), "wide"),
  i("student-3", "classes", img("ryana/hooping/student-flow-3", "Student in a split holding a hoop")),
  v("v-skates", "performances", videos.skates, "tall"),
  i("record-hug", "record", img("ryana/record/record-day-hug", "Ryana with a young hooper and a record certificate")),
  v("v-class", "classes", videos.groupClass, "wide"),
  i("student-5", "classes", img("ryana/hooping/student-flow-5", "Student spinning three hoops")),
  i("record-cert", "record", img("ryana/record/ryana-record-certificate", "Ryana with her certificate"), "wide"),
  v("v-switch", "performances", videos.theSwitch),
  v("v-online", "classes", videos.online2),
  i("record-day-1", "record", img("ryana/record/record-day-1", "Young record holder with certificate")),
  i("with-students", "classes", img("ryana/teaching/ryana-with-students", "Ryana with her students")),
  v("v-studio", "performances", videos.studio),
  i("student-8", "classes", img("ryana/hooping/student-flow-8", "Student juggling hoops")),
  ...archive.map((a, n) => i(`archive-${n}`, "archive", a, n === 0 ? "wide" : undefined)),
];
