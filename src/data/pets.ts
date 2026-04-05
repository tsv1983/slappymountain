export type PetRarity = "common" | "uncommon" | "rare" | "mythic";

export interface PetDef {
  id: string;
  name: string;
  price: number;
  rarity: PetRarity;
  /** Short description for shop / HUD */
  description: string;
  /** Multipliers & offsets applied in game logic — keep small and readable */
  modifiers: {
    strengthGainMul?: number;
    staminaGainMul?: number;
    moveSpeedMul?: number;
    mountainDamageMul?: number;
    coinRewardMul?: number;
    trainingSpeedMul?: number;
    /** “Defense” — reduces stamina drain when blocked at a mountain (we use as travel cost discount) */
    staminaEfficiencyMul?: number;
    /** Phoenix: bonus coins on partial breaks */
    partialCoinMul?: number;
  };
}

export const PETS: PetDef[] = [
  {
    id: "sugar-glider",
    name: "Sugar Glider",
    price: 35,
    rarity: "common",
    description: "Tiny glider — slightly faster travel.",
    modifiers: { moveSpeedMul: 1.08, staminaEfficiencyMul: 1.05 },
  },
  {
    id: "monkey",
    name: "Monkey",
    price: 55,
    rarity: "common",
    description: "Cheeky trainer — small training speed boost.",
    modifiers: { trainingSpeedMul: 1.12, strengthGainMul: 1.04 },
  },
  {
    id: "owl",
    name: "Owl",
    price: 70,
    rarity: "uncommon",
    description: "Night scout — better stamina efficiency on long trips.",
    modifiers: { staminaEfficiencyMul: 1.12, staminaGainMul: 1.06 },
  },
  {
    id: "llama",
    name: "Llama",
    price: 85,
    rarity: "uncommon",
    description: "Spits coins? Extra coin rewards from mountains.",
    modifiers: { coinRewardMul: 1.15 },
  },
  {
    id: "alpaca",
    name: "Alpaca",
    price: 90,
    rarity: "uncommon",
    description: "Fluffy balance — mild training bonuses.",
    modifiers: { trainingSpeedMul: 1.08, staminaGainMul: 1.08, strengthGainMul: 1.06 },
  },
  {
    id: "turtle",
    name: "Turtle",
    price: 40,
    rarity: "common",
    description: "Slow steps, tough shell — travel slower, but shrugs fatigue.",
    modifiers: { moveSpeedMul: 0.88, staminaEfficiencyMul: 1.18 },
  },
  {
    id: "turtle-golden",
    name: "Golden Turtle",
    price: 120,
    rarity: "rare",
    description: "Shiny shell — bigger defense and coin luck.",
    modifiers: { moveSpeedMul: 0.9, staminaEfficiencyMul: 1.22, coinRewardMul: 1.08 },
  },
  {
    id: "gorilla",
    name: "Gorilla",
    price: 110,
    rarity: "rare",
    description: "Pure power — big strength gains.",
    modifiers: { strengthGainMul: 1.22, mountainDamageMul: 1.08 },
  },
  {
    id: "baby-dragon",
    name: "Baby Dragon",
    price: 280,
    rarity: "mythic",
    description: "Breath of fire — massive mountain damage.",
    modifiers: { mountainDamageMul: 1.35, strengthGainMul: 1.1 },
  },
  {
    id: "phoenix",
    name: "Phoenix",
    price: 320,
    rarity: "mythic",
    description: "Rises again — bonus coins from partial work & recovery.",
    modifiers: { partialCoinMul: 1.4, staminaEfficiencyMul: 1.1, coinRewardMul: 1.1 },
  },
  {
    id: "unicorn",
    name: "Unicorn",
    price: 300,
    rarity: "mythic",
    description: "Sparkle stats — premium all-rounder.",
    modifiers: {
      moveSpeedMul: 1.05,
      trainingSpeedMul: 1.12,
      staminaGainMul: 1.1,
      strengthGainMul: 1.12,
      coinRewardMul: 1.12,
    },
  },
];

export function getPetById(id: string | null | undefined): PetDef | undefined {
  if (!id) return undefined;
  return PETS.find((p) => p.id === id);
}
