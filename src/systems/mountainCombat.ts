import type { MountainDef } from "../data/mountains";
import { COMBAT } from "../data/statGrowth";
import type { CombinedModifiers } from "../game/petModifiers";

export interface HitResult {
  damage: number;
  /** Effective strength factor for UI / feedback */
  efficiency: number;
}

export function computeMountainHit(
  mountain: MountainDef,
  strength: number,
  mods: CombinedModifiers
): HitResult {
  const required = mountain.strengthRequired;
  const ratio = strength / required;
  let efficiency = 1;
  if (ratio < 1) {
    efficiency = Math.max(0.15, ratio * (1 - COMBAT.underStrengthPenalty) + COMBAT.underStrengthPenalty * ratio);
  }
  const base = strength * COMBAT.damagePerStrength * mods.mountainDamageMul;
  const damage = base * efficiency;
  return { damage, efficiency };
}

/** Stamina gate: effective requirement lowered by pet efficiency */
export function effectiveStaminaRequirement(
  mountain: MountainDef,
  mods: CombinedModifiers
): number {
  return mountain.staminaRequired / mods.staminaEfficiencyMul;
}
