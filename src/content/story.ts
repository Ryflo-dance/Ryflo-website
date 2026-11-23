import { img, videos } from "./media";

/**
 * Brand storytelling. Chapter copy is PROPOSED and should be reviewed by Ryana.
 * Facts we can show from supplied material are marked `verified`.
 */
export const chapters = [
  {
    id: "dancer",
    number: "01",
    title: "The Dancer",
    kicker: "Rhythm, discipline, expression",
    body: "Long before the hoops, there was Bharatanatyam. Years of classical training taught Ryana to listen to rhythm with her whole body — the precision of footwork, the storytelling in a glance, the discipline of practice. That foundation still lives in every move she makes.",
    image: img("ryana/portraits/ryana-studio-portrait", "Portrait of Ryana"),
    caption: "Ryana Singh",
    // TODO(Ryana): replace with a Bharatanatyam performance photograph.
  },
  {
    id: "hooper",
    number: "02",
    title: "The Hooper",
    kicker: "Circles, momentum, play",
    body: "Then came the hoop — and a new way to move. Rooftops at sunset, studios, stages and festival grounds: Ryana turned the simple circle into a performance language of spins, isolations and flow.",
    video: videos.goldenHour,
    caption: "Golden hour flow",
  },
  {
    id: "creator",
    number: "03",
    title: "The Creator",
    kicker: "Colour, light, individuality",
    body: "After years of expressing herself through movement, Ryana wanted to help others make their hoops as unique as their own flow. Ryflo was born — holographic tapes chosen by a hooper's eye, made to catch the light mid-spin.",
    image: img("products/tapes/collection-stack-market", "Ryana holding a stack of colourful Ryflo tapes outdoors"),
    caption: "The first Ryflo collection",
  },
] as const;

/**
 * India Book of Records — details transcribed from the certificate photographs.
 * TODO(Ryana): add the exact certification date and any reference number.
 */
export const record = {
  holder: "Ryana Singh",
  publication: "India Book of Records 2026",
  title: "Maximum hula hoop knee spins on one leg performed in one minute by an individual",
  highlight: { value: "191", label: "anticlockwise knee spins in one minute" },
  date: null as string | null,
  description:
    "Ryana set the India Book of Records mark for the maximum hula hoop knee spins on one leg performed in one minute by an individual.",
  images: {
    hero: img("ryana/record/ryana-record-certificate", "Ryana holding her India Book of Records certificate and the 2026 edition"),
    kit: img("ryana/record/record-kit", "India Book of Records certificate, medal, badge and holder card"),
    medal: img("ryana/portraits/ryana-medal-kiss", "Ryana kissing her India Book of Records medal"),
    portrait: img("ryana/portraits/ryana-medal-portrait", "Ryana wearing her India Book of Records medal"),
  },
};

/** Milestones shown on /about. Only items supported by supplied material. */
export const milestones = [
  { label: "Classical roots", text: "Trained in Bharatanatyam — the foundation of her musicality and expression." },
  { label: "College", text: "President of her college dance society, leading a team across inter-college circuits." },
  { label: "On stage", text: "Performs hoop flow at events, festivals and flow-art gatherings." },
  { label: "Teaching", text: "Teaches young hoopers in studio groups and live online sessions." },
  { label: "Record", text: "India Book of Records holder — maximum hula hoop knee spins on one leg in one minute." },
  { label: "Ryflo", text: "Founded Ryflo to bring performance-ready shine to every hooper's hoop." },
];

export const archive = [
  img("ryana/archive/archive-dance-team", "College dance team holding certificates"),
  img("ryana/archive/archive-dance-society-page", "Yearbook page about the dance society and its achievements"),
  img("ryana/archive/archive-hoop-carnival", "School carnival photograph of a child performing with a hoop"),
  img("ryana/archive/archive-dance-ensemble", "School dance ensemble in costume"),
  img("ryana/archive/archive-republic-day", "School Republic Day performance with the tricolour"),
  img("ryana/archive/archive-stage", "School stage competition"),
  img("ryana/archive/archive-college", "College group photograph"),
];
