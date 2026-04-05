import { create } from "zustand";
import { MOUNTAINS } from "../data/mountains";
import { PETS } from "../data/pets";
import { STAT_GROWTH } from "../data/statGrowth";
import { combinePetModifiers } from "./petModifiers";
import { computeMountainHit, effectiveStaminaRequirement } from "../systems/mountainCombat";
import { loadPersisted, savePersisted } from "./persistence";
import type { FloatingNumber, MountainProgress, PersistedState } from "./types";

const INITIAL = {
  strength: 5,
  staminaMax: 10,
  coins: 0,
  ownedPetIds: [] as string[],
  equippedPetId: null as string | null,
};

function defaultMountains(): Record<string, MountainProgress> {
  const o: Record<string, MountainProgress> = {};
  for (const m of MOUNTAINS) {
    o[m.id] = { damageDealt: 0, broken: false };
  }
  return o;
}

export type Scene = "overworld" | "gym";

interface GameStore {
  strength: number;
  staminaMax: number;
  coins: number;
  ownedPetIds: string[];
  equippedPetId: string | null;
  mountains: Record<string, MountainProgress>;
  tutorialSeen: boolean;
  playerPosition: [number, number, number];
  livePlayer: [number, number];

  scene: Scene;
  enterGym: () => void;
  exitGym: (exitZ: number) => void;

  /** Radians — Space+Arrow orbit */
  cameraYaw: number;
  setCameraYaw: (y: number) => void;

  /** Treadmill timing gate — timestamp (ms) when cooldown ends */
  treadmillCooldownEnd: number;

  shopOpen: boolean;
  setShopOpen: (v: boolean) => void;

  trainingStationId: string | null;
  setTrainingStation: (id: string | null) => void;

  activeMountainId: string | null;
  setActiveMountain: (id: string | null) => void;

  shake: number;
  setShake: (n: number) => void;

  floatingNumbers: FloatingNumber[];
  pushFloat: (f: Omit<FloatingNumber, "born"> & { born?: number }) => void;
  cullFloats: (now: number) => void;

  lastHint: string;
  setHint: (s: string) => void;

  setPlayerPosition: (pos: [number, number, number]) => void;

  equipPet: (id: string | null) => void;
  buyPet: (id: string) => boolean;

  /** Discrete: +1 strength per call */
  trainStrength: () => void;
  /** Discrete: +1 stamina per call, respects treadmill timing gate */
  trainStamina: () => boolean;
  /** Legacy continuous training — kept for future use */
  trainTick: (kind: "treadmill" | "deadlift", dt: number) => void;

  tryBreakMountain: (mountainId: string) => void;
  resetProgress: () => void;

  persist: () => void;
  hydrate: () => void;
}

let persistTimer: ReturnType<typeof setTimeout> | null = null;

function schedulePersist(get: () => GameStore) {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => get().persist(), 400);
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...INITIAL,
  mountains: defaultMountains(),
  tutorialSeen: false,
  playerPosition: [0, 0, 18],
  livePlayer: [0, 18],

  scene: "overworld",

  enterGym: () => {
    set({
      scene: "gym",
      playerPosition: [0, 0, 4],
      livePlayer: [0, 4],
      lastHint: "Inside the gym! Deadlift (left) = press E for +1 STR. Treadmill (right) = press E for +1 STA.",
    });
    schedulePersist(get);
  },

  exitGym: (exitZ: number) => {
    const outsideZ = exitZ < 0 ? -22 : 22;
    set({
      scene: "overworld",
      playerPosition: [0, 0, outsideZ],
      livePlayer: [0, outsideZ],
      lastHint: "Back outside — follow paths to the mountains!",
    });
    schedulePersist(get);
  },

  cameraYaw: 0,
  setCameraYaw: (cameraYaw) => set({ cameraYaw }),

  treadmillCooldownEnd: 0,

  shopOpen: false,
  setShopOpen: (v) => set({ shopOpen: v }),

  trainingStationId: null,
  setTrainingStation: (id) => set({ trainingStationId: id }),

  activeMountainId: null,
  setActiveMountain: (id) => set({ activeMountainId: id }),

  shake: 0,
  setShake: (n) => set({ shake: Math.max(0, Math.min(1, n)) }),

  floatingNumbers: [],
  pushFloat: (f) =>
    set((s) => ({
      floatingNumbers: [
        ...s.floatingNumbers,
        { ...f, born: f.born ?? performance.now() },
      ],
    })),
  cullFloats: (now) =>
    set((s) => ({
      floatingNumbers: s.floatingNumbers.filter((x) => now - x.born < 1600),
    })),

  lastHint: "Head to the gym entrance — walk into the front door!",
  setHint: (lastHint) => set({ lastHint }),

  setPlayerPosition: (playerPosition) => {
    set({ playerPosition });
    schedulePersist(get);
  },

  equipPet: (id) => {
    const st = get();
    if (id && !st.ownedPetIds.includes(id)) return;
    set({ equippedPetId: id });
    schedulePersist(get);
  },

  buyPet: (id) => {
    const pet = PETS.find((p) => p.id === id);
    if (!pet) return false;
    const st = get();
    if (st.ownedPetIds.includes(id)) return false;
    if (st.coins < pet.price) return false;
    set({
      coins: st.coins - pet.price,
      ownedPetIds: [...st.ownedPetIds, id],
      equippedPetId: id,
    });
    schedulePersist(get);
    return true;
  },

  trainStrength: () => {
    const mods = combinePetModifiers(get().equippedPetId);
    const gain = STAT_GROWTH.strengthPerPress * mods.strengthGainMul;
    set((s) => ({
      strength: Math.min(STAT_GROWTH.statSoftCap, s.strength + gain),
      lastHint: `+${gain.toFixed(1)} Strength!`,
    }));
    schedulePersist(get);
  },

  trainStamina: () => {
    const now = performance.now();
    if (now < get().treadmillCooldownEnd) return false;
    const mods = combinePetModifiers(get().equippedPetId);
    const gain = STAT_GROWTH.staminaPerPress * mods.staminaGainMul;
    set((s) => ({
      staminaMax: Math.min(STAT_GROWTH.statSoftCap, s.staminaMax + gain),
      treadmillCooldownEnd: now + STAT_GROWTH.treadmillCooldownSec * 1000,
      lastHint: `+${gain.toFixed(1)} Stamina! Next in ${STAT_GROWTH.treadmillCooldownSec}s.`,
    }));
    schedulePersist(get);
    return true;
  },

  trainTick: (_kind, _dt) => {
    /* legacy — no-op in v2, kept for interface compat */
  },

  tryBreakMountain: (mountainId) => {
    const mountain = MOUNTAINS.find((m) => m.id === mountainId);
    if (!mountain) return;
    const st = get();
    const prog = st.mountains[mountainId] ?? { damageDealt: 0, broken: false };
    if (prog.broken) return;

    const mods = combinePetModifiers(st.equippedPetId);
    const need = effectiveStaminaRequirement(mountain, mods);
    if (st.staminaMax < need - 0.01) {
      set({ lastHint: `Need more stamina (≥${mountain.staminaRequired}) to reach ${mountain.name}.` });
      return;
    }

    const { damage, efficiency } = computeMountainHit(mountain, st.strength, mods);
    const newDamage = prog.damageDealt + damage;
    const prevRatio = prog.damageDealt / mountain.maxHealth;
    const ratio = newDamage / mountain.maxHealth;

    if (ratio >= 1) {
      const coinReward = Math.floor(
        mountain.baseCoins * STAT_GROWTH.coinMultiplier * mods.coinRewardMul
      );
      set((s) => ({
        mountains: {
          ...s.mountains,
          [mountainId]: { damageDealt: mountain.maxHealth, broken: true },
        },
        coins: s.coins + coinReward,
        lastHint: `Destroyed ${mountain.name}! +${coinReward} coins`,
        shake: 0.85,
      }));
      get().pushFloat({
        id: `${mountainId}-coin-${Date.now()}`,
        text: `+${coinReward}¢`,
        position: [mountain.position[0], mountain.position[1] + 4, mountain.position[2]],
        color: "#fbbf24",
      });
    } else {
      let bonusCoins = 0;
      if (Math.floor(ratio * 10) > Math.floor(prevRatio * 10)) {
        bonusCoins = Math.max(1, Math.floor(mountain.baseCoins * 0.05 * mods.partialCoinMul));
      }
      set((s) => ({
        mountains: {
          ...s.mountains,
          [mountainId]: { damageDealt: newDamage, broken: false },
        },
        coins: s.coins + bonusCoins,
        lastHint:
          efficiency < 0.55
            ? `Chipping away… train strength (${mountain.strengthRequired}) for faster breaks.`
            : `Wrecking ${mountain.name} — ${Math.round(ratio * 100)}%`,
        shake: 0.35,
      }));
      if (bonusCoins > 0) {
        get().pushFloat({
          id: `${mountainId}-p-${Date.now()}`,
          text: `+${bonusCoins}¢`,
          position: [mountain.position[0], mountain.position[1] + 3.5, mountain.position[2]],
          color: "#fde68a",
        });
      }
    }
    schedulePersist(get);
  },

  resetProgress: () => {
    set({
      ...INITIAL,
      mountains: defaultMountains(),
      tutorialSeen: false,
      playerPosition: [0, 0, 18],
      livePlayer: [0, 18],
      scene: "overworld",
      cameraYaw: 0,
      treadmillCooldownEnd: 0,
      lastHint: "Progress reset.",
    });
    savePersisted(buildPersisted(get()));
  },

  persist: () => savePersisted(buildPersisted(get())),

  hydrate: () => {
    const p = loadPersisted();
    if (!p || p.version !== 1) return;
    set({
      strength: p.strength ?? INITIAL.strength,
      staminaMax: p.staminaMax ?? INITIAL.staminaMax,
      coins: p.coins ?? INITIAL.coins,
      ownedPetIds: p.ownedPetIds ?? [],
      equippedPetId: p.equippedPetId ?? null,
      mountains: { ...defaultMountains(), ...p.mountains },
      tutorialSeen: p.tutorialSeen ?? false,
      playerPosition: p.playerPosition ?? [0, 0, 18],
      livePlayer: [p.playerPosition?.[0] ?? 0, p.playerPosition?.[2] ?? 18],
      scene: "overworld",
    });
  },
}));

function buildPersisted(store: GameStore): PersistedState {
  return {
    version: 1,
    strength: store.strength,
    staminaMax: store.staminaMax,
    coins: store.coins,
    ownedPetIds: store.ownedPetIds,
    equippedPetId: store.equippedPetId,
    mountains: store.mountains,
    tutorialSeen: store.tutorialSeen,
    playerPosition: store.playerPosition,
  };
}
