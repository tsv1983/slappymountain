/** Tunable progression — adjust for pacing */

export const STAT_GROWTH = {
  /** Strength gained per E-press at the deadlift station */
  strengthPerPress: 1,
  /** Stamina gained per valid E-press at the treadmill */
  staminaPerPress: 1,
  /** Seconds the player must wait between treadmill presses */
  treadmillCooldownSec: 10,
  statSoftCap: 120,
  coinMultiplier: 1,
} as const;

export const COMBAT = {
  damagePerStrength: 3.5,
  underStrengthPenalty: 0.45,
} as const;
