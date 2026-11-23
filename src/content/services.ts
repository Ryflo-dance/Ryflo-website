import { img, videos } from "./media";

/**
 * Class & event offerings. These are SUGGESTED categories — edit freely once Ryana
 * confirms what she offers. No schedules or prices are published until confirmed.
 */
export const classOfferings = [
  {
    id: "beginner",
    title: "Beginner Hooping",
    blurb: "First hoop, first spin, first wow. Find your waist hoop rhythm and build confidence from zero.",
    for: "Kids & adults",
    image: img("ryana/teaching/student-first-hoop", "A young student holding a pink hoop in class"),
  },
  {
    id: "intermediate",
    title: "Intermediate & Advanced",
    blurb: "Multi-hoop, off-body tricks, transitions and flow combos — layered with musicality from classical dance.",
    for: "Hoopers with the basics",
    image: img("ryana/hooping/student-flow-5", "Student spinning three hoops at once"),
  },
  {
    id: "private",
    title: "Private Sessions",
    blurb: "One-on-one time with Ryana, shaped entirely around your goals — a routine, a trick, a performance.",
    for: "Anyone",
    image: img("ryana/teaching/ryana-teaching-laugh", "Ryana laughing while teaching a young student"),
  },
  {
    id: "workshop",
    title: "Group Workshops",
    blurb: "High-energy sessions for schools, studios, communities and celebrations.",
    for: "Groups & organisations",
    image: img("ryana/teaching/group-class", "A group class posing with colourful hoops"),
  },
] as const;

export const experienceLevels = ["Never hooped before", "Beginner", "Intermediate", "Advanced"] as const;
export const classLocations = ["In person", "Online", "Either works"] as const;

export const eventTypes = [
  "Live performance",
  "Private event",
  "Corporate event",
  "Cultural event",
  "Workshop / collaboration",
  "Something else",
] as const;

export const performanceReel = [
  videos.rooftop,
  videos.flowArt,
  videos.goldenHour,
  videos.skates,
  videos.theSwitch,
  videos.studio,
];

export const studentGallery = [
  img("ryana/hooping/student-flow-1", "Student balancing multiple hoops"),
  img("ryana/hooping/student-flow-3", "Student in a standing split with a hoop at the ankle"),
  img("ryana/hooping/student-flow-6", "Student framed by hoops"),
  img("ryana/hooping/student-flow-9", "Student spinning hoops on arm and waist"),
  img("ryana/teaching/ryana-with-students", "Ryana with her young students"),
];
