/**
 * Roster for the campus-court easter egg: swapping a player's identity
 * changes their kit colors and silhouette (sleeves, hair, headband,
 * racket). Plain data only — no three.js imports — so UI components can
 * use it without pulling the 3D bundle into the main chunk.
 */
export type TennisIdentity = {
  id: string;
  name: string;
  flag: string;
  tag: string;
  shirt: string;
  shorts: string;
  skin: string;
  hair: string;
  racket: string;
  headband: string | null;
  sleeveless: boolean;
  longHair: boolean;
};

export const tennisRoster: TennisIdentity[] = [
  {
    id: "rishi",
    name: "Rishi Khandelwal",
    flag: "🎾",
    tag: "back to the practice routine",
    shirt: "#f0b55a",
    shorts: "#eceee7",
    skin: "#c88c61",
    hair: "#33241a",
    racket: "#e4d668",
    headband: null,
    sleeveless: false,
    longHair: false,
  },
  {
    id: "federer",
    name: "Roger Federer",
    flag: "🇨🇭",
    tag: "one-handed backhand activated",
    shirt: "#f6f4ec",
    shorts: "#2a3b56",
    skin: "#e3b48d",
    hair: "#6d4b2c",
    racket: "#efe6c8",
    headband: null,
    sleeveless: false,
    longHair: false,
  },
  {
    id: "nadal",
    name: "Rafael Nadal",
    flag: "🇪🇸",
    tag: "lefty forehand loaded",
    shirt: "#d9542d",
    shorts: "#2c3d5c",
    skin: "#d9a06b",
    hair: "#4a3320",
    racket: "#20304e",
    headband: null,
    sleeveless: true,
    longHair: true,
  },
  {
    id: "djokovic",
    name: "Novak Djokovic",
    flag: "🇷🇸",
    tag: "elastic return stance online",
    shirt: "#33539e",
    shorts: "#f6f4ec",
    skin: "#e0b48e",
    hair: "#7b5a33",
    racket: "#3a5fa8",
    headband: "#f6f4ec",
    sleeveless: false,
    longHair: false,
  },
  {
    id: "serena",
    name: "Serena Williams",
    flag: "🇺🇸",
    tag: "serve power set to legend",
    shirt: "#e5f164",
    shorts: "#232a33",
    skin: "#8a5a3b",
    hair: "#241a12",
    racket: "#232a33",
    headband: null,
    sleeveless: false,
    longHair: true,
  },
  {
    id: "agassi",
    name: "Andre Agassi",
    flag: "🇺🇸",
    tag: "neon-era showtime",
    shirt: "#f2509b",
    shorts: "#8fe03c",
    skin: "#d99a6c",
    hair: "#59401f",
    racket: "#8fe03c",
    headband: "#8fe03c",
    sleeveless: true,
    longHair: true,
  },
];

/** Hidden words that trigger identity changes when typed anywhere. */
export const rosterTriggers: Record<string, number> = {
  rishi: 0,
  federer: 1,
  roger: 1,
  nadal: 2,
  rafa: 2,
  djokovic: 3,
  nole: 3,
  serena: 4,
  williams: 4,
  agassi: 5,
};
