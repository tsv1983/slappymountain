import type { Vector3Tuple } from "three";

export type GymStationKind = "treadmill" | "deadlift";

export interface GymStationDef {
  id: string;
  kind: GymStationKind;
  label: string;
  /** Position inside the gym interior */
  position: Vector3Tuple;
  rotationY: number;
}

export const GYM_EQUIPMENT: GymStationDef[] = [
  {
    id: "dead-1",
    kind: "deadlift",
    label: "Thunder Deadlift",
    position: [-8, 0, 0],
    rotationY: Math.PI * 0.5,
  },
  {
    id: "tread-1",
    kind: "treadmill",
    label: "Turbo Treadmill",
    position: [8, 0, 0],
    rotationY: -Math.PI * 0.5,
  },
];

/** Gym interior door trigger zones (world coords) */
export const GYM_DOORS = {
  frontInside: { x: 0, z: 10, label: "Exit (Front)" },
  backInside: { x: 0, z: -10, label: "Exit (Back)" },
  /** Overworld trigger to enter gym */
  frontOutside: { x: 0, z: 14.5 },
} as const;

export const GYM_INTERIOR_BOUNDS = {
  minX: -13,
  maxX: 13,
  minZ: -11,
  maxZ: 11,
} as const;

/** Exterior collision AABB — keeps player outside the gym building walls */
export const GYM_EXTERIOR_FOOTPRINT = {
  minX: -17.5,
  maxX: 17.5,
  minZ: -13.5,
  maxZ: 13,
} as const;

/** Front door pass-through zone (player can enter here to trigger gym) */
export const GYM_FRONT_DOOR_ZONE = {
  minX: -3,
  maxX: 3,
  minZ: 11.5,
} as const;

/** Water zone: ring between these radii triggers ripple effects */
export const WATER_ZONE = {
  innerRadius: 28,
  outerRadius: 92,
} as const;
