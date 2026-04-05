import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../game/store";
import { WATER_ZONE } from "../data/gymEquipment";

const POOL = 10;
const SPAWN_INTERVAL = 0.38;
const LIFETIME = 2.5;
const MAX_RADIUS = 2.4;

interface RippleSlot {
  active: boolean;
  x: number;
  z: number;
  born: number;
}

export function WaterRipples() {
  const groupRef = useRef<THREE.Group>(null);
  const slots = useRef<RippleSlot[]>(
    Array.from({ length: POOL }, () => ({ active: false, x: 0, z: 0, born: 0 }))
  );
  const spawnTimer = useRef(0);
  const prevPos = useRef<[number, number]>([0, 0]);

  useFrame((_, dt) => {
    const scene = useGameStore.getState().scene;
    if (scene !== "overworld") {
      slots.current.forEach((s) => (s.active = false));
      return;
    }

    const [px, pz] = useGameStore.getState().livePlayer;
    const dist = Math.sqrt(px * px + pz * pz);
    const onWater = dist > WATER_ZONE.innerRadius && dist < WATER_ZONE.outerRadius;

    const dx = px - prevPos.current[0];
    const dz = pz - prevPos.current[1];
    const isMoving = Math.sqrt(dx * dx + dz * dz) > 0.02;
    prevPos.current = [px, pz];

    if (onWater && isMoving) {
      spawnTimer.current += dt;
      if (spawnTimer.current >= SPAWN_INTERVAL) {
        spawnTimer.current = 0;
        const free = slots.current.find((s) => !s.active);
        if (free) {
          free.active = true;
          free.x = px;
          free.z = pz;
          free.born = performance.now();
        }
      }
    } else {
      spawnTimer.current = 0;
    }

    const group = groupRef.current;
    if (!group) return;
    const now = performance.now();

    for (let i = 0; i < POOL; i++) {
      const slot = slots.current[i];
      const mesh = group.children[i] as THREE.Mesh;
      if (!mesh) continue;

      if (!slot.active) {
        mesh.visible = false;
        continue;
      }

      const age = (now - slot.born) / 1000;
      if (age > LIFETIME) {
        slot.active = false;
        mesh.visible = false;
        continue;
      }

      const t = age / LIFETIME;
      const radius = 0.2 + t * MAX_RADIUS;
      const opacity = 0.45 * (1 - t * t);

      mesh.visible = true;
      mesh.position.set(slot.x, 0.06, slot.z);
      mesh.scale.setScalar(radius);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: POOL }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
          <ringGeometry args={[0.85, 1, 32]} />
          <meshBasicMaterial
            color="#a0c8d8"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
