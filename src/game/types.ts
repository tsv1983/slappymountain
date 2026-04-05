export interface MountainProgress {
  damageDealt: number;
  broken: boolean;
}

export interface PersistedState {
  version: 1;
  strength: number;
  staminaMax: number;
  coins: number;
  ownedPetIds: string[];
  equippedPetId: string | null;
  mountains: Record<string, MountainProgress>;
  tutorialSeen: boolean;
  playerPosition: [number, number, number];
}

export interface FloatingNumber {
  id: string;
  text: string;
  position: [number, number, number];
  color: string;
  born: number;
}
