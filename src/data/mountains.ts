import type { Vector3Tuple } from "three";

export type MountainShape = "cone" | "spire" | "mesa" | "twin";

export interface MountainDef {
  id: string;
  name: string;
  position: Vector3Tuple;
  staminaRequired: number;
  strengthRequired: number;
  maxHealth: number;
  baseCoins: number;
  scale: number;
  color: string;
  rockColor: string;
  rimColor: string;
  shape: MountainShape;
}

/** Gym at origin — paths radiate to peaks */
export const MOUNTAINS: MountainDef[] = [
  {
    id: "mole-hill",
    name: "Sprout Knoll",
    position: [16, 0, 6],
    staminaRequired: 7,
    strengthRequired: 5,
    maxHealth: 34,
    baseCoins: 14,
    scale: 0.62,
    color: "#6ee7b7",
    rockColor: "#57534e",
    rimColor: "#34d399",
    shape: "cone",
  },
  {
    id: "bump",
    name: "Breeze Bump",
    position: [-14, 0, 14],
    staminaRequired: 13,
    strengthRequired: 11,
    maxHealth: 72,
    baseCoins: 24,
    scale: 0.82,
    color: "#4ade80",
    rockColor: "#44403c",
    rimColor: "#22c55e",
    shape: "mesa",
  },
  {
    id: "ridge",
    name: "Jagged Ridge",
    position: [26, 0, -20],
    staminaRequired: 26,
    strengthRequired: 22,
    maxHealth: 130,
    baseCoins: 48,
    scale: 1.05,
    color: "#2dd4bf",
    rockColor: "#292524",
    rimColor: "#14b8a6",
    shape: "spire",
  },
  {
    id: "granite",
    name: "Iron Granite",
    position: [-30, 0, -22],
    staminaRequired: 40,
    strengthRequired: 36,
    maxHealth: 240,
    baseCoins: 88,
    scale: 1.28,
    color: "#22c55e",
    rockColor: "#1c1917",
    rimColor: "#15803d",
    shape: "twin",
  },
  {
    id: "sky-spire",
    name: "Sky Spire",
    position: [38, 0, 28],
    staminaRequired: 54,
    strengthRequired: 48,
    maxHealth: 400,
    baseCoins: 145,
    scale: 1.48,
    color: "#10b981",
    rockColor: "#0c0a09",
    rimColor: "#059669",
    shape: "spire",
  },
];
