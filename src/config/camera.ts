/** High-angle overworld follow */
export const OVERWORLD_CAMERA = {
  height: 26,
  distanceZ: 19,
  slightX: 0.35,
  lookAtY: 0.85,
  lerp: 7,
} as const;

/** Indoor gym camera — lower, tighter */
export const GYM_CAMERA = {
  height: 18,
  distanceZ: 12,
  slightX: 0,
  lookAtY: 1.0,
  lerp: 6,
} as const;

/** Space+Arrow camera orbit speed (radians/sec) */
export const CAMERA_ORBIT_SPEED = 1.8;
