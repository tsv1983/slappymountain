/**
 * Quality toggles — adjust for target hardware.
 *
 * To lower quality for weaker machines:
 *   set segments to "low", shadows to false, bloom to false
 */
export const QUALITY = {
  /** "high" = smooth curves, "low" = fewer triangles */
  segments: "high" as "high" | "low",

  /** Enable bloom on emissive surfaces */
  bloom: true,

  /** SMAA anti-aliasing pass */
  smaa: true,

  /** drei ContactShadows for soft ground contact */
  contactShadows: true,

  /** drei Environment for IBL reflections (requires network on first load) */
  environmentIBL: true,

  /** Max device pixel ratio (higher = sharper but more GPU) */
  maxDpr: 1.5,

  /** Shadow map resolution (per axis) */
  shadowMapSize: 2048,
} as const;

/** Geometry segment counts keyed by quality tier */
export const SEG = QUALITY.segments === "high"
  ? { cyl: 24, cone: 16, sphere: 24, circle: 32, ring: 48 }
  : { cyl: 10, cone: 8, sphere: 12, circle: 16, ring: 24 };
