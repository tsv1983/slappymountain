import { getPetById } from "../data/pets";

export interface CombinedModifiers {
  strengthGainMul: number;
  staminaGainMul: number;
  moveSpeedMul: number;
  mountainDamageMul: number;
  coinRewardMul: number;
  trainingSpeedMul: number;
  staminaEfficiencyMul: number;
  partialCoinMul: number;
}

const ONE: CombinedModifiers = {
  strengthGainMul: 1,
  staminaGainMul: 1,
  moveSpeedMul: 1,
  mountainDamageMul: 1,
  coinRewardMul: 1,
  trainingSpeedMul: 1,
  staminaEfficiencyMul: 1,
  partialCoinMul: 1,
};

export function combinePetModifiers(equippedPetId: string | null): CombinedModifiers {
  const pet = getPetById(equippedPetId);
  if (!pet) return { ...ONE };
  const m = pet.modifiers;
  return {
    strengthGainMul: m.strengthGainMul ?? 1,
    staminaGainMul: m.staminaGainMul ?? 1,
    moveSpeedMul: m.moveSpeedMul ?? 1,
    mountainDamageMul: m.mountainDamageMul ?? 1,
    coinRewardMul: m.coinRewardMul ?? 1,
    trainingSpeedMul: m.trainingSpeedMul ?? 1,
    staminaEfficiencyMul: m.staminaEfficiencyMul ?? 1,
    partialCoinMul: m.partialCoinMul ?? 1,
  };
}
