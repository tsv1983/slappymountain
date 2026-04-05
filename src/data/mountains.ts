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
    color: "#8a9a6a",
    rockColor: "#5a5048",
    rimColor: "#6a7a4a",
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
    color: "#7a8a58",
    rockColor: "#4a4038",
    rimColor: "#5a7a38",
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
    color: "#6a7a80",
    rockColor: "#3a3430",
    rimColor: "#5a6a70",
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
    color: "#6a6a5a",
    rockColor: "#2a2820",
    rimColor: "#5a5a48",
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
    color: "#5a7070",
    rockColor: "#1e1c18",
    rimColor: "#4a6060",
    shape: "spire",
  },
];
