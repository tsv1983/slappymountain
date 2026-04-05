import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  GYM_EQUIPMENT,
  GYM_DOORS,
  GYM_INTERIOR_BOUNDS,
  GYM_EXTERIOR_FOOTPRINT,
  GYM_FRONT_DOOR_ZONE,
} from "../data/gymEquipment";
import { MOUNTAINS } from "../data/mountains";
import { combinePetModifiers } from "../game/petModifiers";
import { useGameStore } from "../game/store";
import { useKeyboard } from "../hooks/useKeyboard";
import { sfx } from "../utils/audio";
import { effectiveStaminaRequirement } from "../systems/mountainCombat";

const INTERACT_STATION = 3.5;
const INTERACT_MOUNTAIN = 5.8;
const DOOR_TRIGGER = 2.8;

export function Player({
  onMove,
}: {
  onMove?: (pos: THREE.Vector3, yaw: number) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const trainStrength = useGameStore((s) => s.trainStrength);
  const trainStamina = useGameStore((s) => s.trainStamina);
  const tryBreakMountain = useGameStore((s) => s.tryBreakMountain);
  const setTrainingStation = useGameStore((s) => s.setTrainingStation);
  const setActiveMountain = useGameStore((s) => s.setActiveMountain);
  const equippedPetId = useGameStore((s) => s.equippedPetId);
  const staminaMax = useGameStore((s) => s.staminaMax);
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);
  const setShopOpen = useGameStore((s) => s.setShopOpen);
  const shopOpen = useGameStore((s) => s.shopOpen);
  const enterGym = useGameStore((s) => s.enterGym);
  const exitGym = useGameStore((s) => s.exitGym);
  const mods = useMemo(() => combinePetModifiers(equippedPetId), [equippedPetId]);

  const breakCooldown = useRef(0);
  const trainCooldown = useRef(0);
  const doorCooldown = useRef(0);
  const posSaveAcc = useRef(0);
  const shopEdge = useRef(false);
  const resetEdge = useRef(false);
  const bob = useRef(0);

  useLayoutEffect(() => {
    const g = ref.current;
    if (!g) return;
    const [x, y, z] = useGameStore.getState().playerPosition;
    g.position.set(x, y, z);
  }, []);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;

    const scene = useGameStore.getState().scene;

    breakCooldown.current = Math.max(0, breakCooldown.current - dt);
    trainCooldown.current = Math.max(0, trainCooldown.current - dt);
    doorCooldown.current = Math.max(0, doorCooldown.current - dt);

    const holdingSpace = keys.current.space;
    const speed = (keys.current.sprint ? 13 : 8.5) * mods.moveSpeedMul;
    const dir = new THREE.Vector3();

    if (keys.current.forward) dir.z -= 1;
    if (keys.current.back) dir.z += 1;
    if (!holdingSpace) {
      if (keys.current.left) dir.x -= 1;
      if (keys.current.right) dir.x += 1;
    }

    const cameraYaw = useGameStore.getState().cameraYaw;
    const moving = dir.lengthSq() > 0;
    if (moving) {
      dir.normalize();
      dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraYaw);
    }

    if (moving) {
      g.rotation.y = Math.atan2(dir.x, dir.z);
    }

    g.position.x += dir.x * speed * dt;
    g.position.z += dir.z * speed * dt;

    if (scene === "gym") {
      g.position.x = THREE.MathUtils.clamp(
        g.position.x,
        GYM_INTERIOR_BOUNDS.minX,
        GYM_INTERIOR_BOUNDS.maxX
      );
      g.position.z = THREE.MathUtils.clamp(
        g.position.z,
        GYM_INTERIOR_BOUNDS.minZ,
        GYM_INTERIOR_BOUNDS.maxZ
      );
    } else {
      const limit = 95;
      g.position.x = THREE.MathUtils.clamp(g.position.x, -limit, limit);
      g.position.z = THREE.MathUtils.clamp(g.position.z, -limit, limit);

      const fp = GYM_EXTERIOR_FOOTPRINT;
      const px = g.position.x;
      const pz = g.position.z;
      const inX = px > fp.minX && px < fp.maxX;
      const inZ = pz > fp.minZ && pz < fp.maxZ;
      if (inX && inZ) {
        const inDoor =
          px > GYM_FRONT_DOOR_ZONE.minX &&
          px < GYM_FRONT_DOOR_ZONE.maxX &&
          pz > GYM_FRONT_DOOR_ZONE.minZ;
        if (!inDoor) {
          const dL = px - fp.minX;
          const dR = fp.maxX - px;
          const dB = pz - fp.minZ;
          const dF = fp.maxZ - pz;
          const min = Math.min(dL, dR, dB, dF);
          if (min === dL) g.position.x = fp.minX;
          else if (min === dR) g.position.x = fp.maxX;
          else if (min === dB) g.position.z = fp.minZ;
          else g.position.z = fp.maxZ;
        }
      }
    }
    g.position.y = 0;

    bob.current += dt * (moving ? 14 : 3);
    const bounce = moving ? Math.sin(bob.current) * 0.12 : Math.sin(bob.current) * 0.04;
    const child = g.children[0] as THREE.Object3D | undefined;
    if (child) child.position.y = 0.95 + bounce;

    const consumed = keys.current.interactEdge;
    if (consumed) keys.current.interactEdge = false;

    // --- Door triggers (guarded by cooldown to prevent oscillation) ---
    if (doorCooldown.current <= 0) {
      if (scene === "overworld") {
        const dxFront = Math.abs(g.position.x - GYM_DOORS.frontOutside.x);
        const dzFront = Math.abs(g.position.z - GYM_DOORS.frontOutside.z);
        if (dxFront < 4 && dzFront < DOOR_TRIGGER) {
          enterGym();
          g.position.set(0, 0, 4);
          doorCooldown.current = 0.6;
          sfx.ui();
          return;
        }
      }

      if (scene === "gym") {
        const frontDist = Math.hypot(
          g.position.x - GYM_DOORS.frontInside.x,
          g.position.z - GYM_DOORS.frontInside.z
        );
        if (frontDist < DOOR_TRIGGER) {
          exitGym(GYM_DOORS.frontInside.z);
          g.position.set(0, 0, 22);
          doorCooldown.current = 0.6;
          sfx.ui();
          return;
        }
        const backDist = Math.hypot(
          g.position.x - GYM_DOORS.backInside.x,
          g.position.z - GYM_DOORS.backInside.z
        );
        if (backDist < DOOR_TRIGGER) {
          exitGym(GYM_DOORS.backInside.z);
          g.position.set(0, 0, -22);
          doorCooldown.current = 0.6;
          sfx.ui();
          return;
        }
      }
    }

    // --- Gym station interaction (only inside gym) ---
    if (scene === "gym") {
      let nearStation: string | null = null;
      let stationKind: "treadmill" | "deadlift" | null = null;
      for (const s of GYM_EQUIPMENT) {
        const lp = new THREE.Vector3(...s.position);
        if (g.position.distanceTo(lp) < INTERACT_STATION) {
          nearStation = s.id;
          stationKind = s.kind;
          break;
        }
      }

      if (nearStation && stationKind) {
        setTrainingStation(nearStation);
        if (consumed && trainCooldown.current <= 0) {
          if (stationKind === "deadlift") {
            trainStrength();
            sfx.train();
            trainCooldown.current = 0.22;
          } else {
            const ok = trainStamina();
            if (ok) {
              sfx.train();
            } else {
              const remaining = Math.max(
                0,
                (useGameStore.getState().treadmillCooldownEnd - performance.now()) / 1000
              );
              useGameStore.getState().setHint(`Treadmill cooling down… ${remaining.toFixed(1)}s`);
              sfx.ui();
            }
            trainCooldown.current = 0.22;
          }
        }
      } else {
        setTrainingStation(null);
      }
    } else {
      setTrainingStation(null);
    }

    // --- Mountain interaction (only overworld) ---
    if (scene === "overworld") {
      let nearMountain: string | null = null;
      let bestD = Infinity;
      for (const m of MOUNTAINS) {
        const p = new THREE.Vector3(...m.position);
        const d = g.position.distanceTo(p);
        if (d < INTERACT_MOUNTAIN && d < bestD) {
          bestD = d;
          nearMountain = m.id;
        }
      }
      setActiveMountain(nearMountain);

      if (nearMountain && keys.current.interact && breakCooldown.current <= 0) {
        const mDef = MOUNTAINS.find((x) => x.id === nearMountain)!;
        const need = effectiveStaminaRequirement(mDef, mods);
        const stateBefore = useGameStore.getState().mountains[nearMountain];
        if (stateBefore?.broken) {
          breakCooldown.current = 0.28;
        } else if (staminaMax >= need - 0.01) {
          const wasBroken = stateBefore?.broken;
          tryBreakMountain(nearMountain);
          const after = useGameStore.getState().mountains[nearMountain];
          if (!wasBroken && after?.broken) {
            sfx.breakRock();
            sfx.coin();
          } else if (!wasBroken) {
            sfx.hit();
          }
        } else {
          sfx.ui();
        }
        breakCooldown.current = 0.28;
      }
    } else {
      setActiveMountain(null);
    }

    if (keys.current.shop) {
      if (!shopEdge.current && !shopOpen) {
        setShopOpen(true);
        sfx.ui();
      }
      shopEdge.current = true;
    } else {
      shopEdge.current = false;
    }

    if (keys.current.resetPos) {
      if (!resetEdge.current) {
        if (scene === "gym") {
          g.position.set(0, 0, 5);
          setPlayerPosition([0, 0, 5]);
        } else {
          g.position.set(0, 0, 18);
          setPlayerPosition([0, 0, 18]);
        }
        sfx.ui();
      }
      resetEdge.current = true;
    } else {
      resetEdge.current = false;
    }

    posSaveAcc.current += dt;
    if (posSaveAcc.current > 2) {
      posSaveAcc.current = 0;
      setPlayerPosition([g.position.x, g.position.y, g.position.z]);
    }

    useGameStore.setState({ livePlayer: [g.position.x, g.position.z] });
    onMove?.(g.position.clone(), g.rotation.y);
  });

  return (
    <group ref={ref} position={[0, 0, 18]}>
      <group>
        {/* Body */}
        <mesh castShadow position={[0, 0.55, 0]}>
          <capsuleGeometry args={[0.52, 0.85, 6, 12]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.32} metalness={0.12} />
        </mesh>
        {/* Head */}
        <mesh castShadow position={[0, 1.18, 0]}>
          <sphereGeometry args={[0.44, 16, 16]} />
          <meshStandardMaterial color="#fecdd3" roughness={0.38} />
        </mesh>
        {/* Spiky hair */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            castShadow
            position={[Math.sin(i) * 0.12, 1.52 + i * 0.04, -0.18]}
            rotation={[0.5, 0, (i - 2) * 0.15]}
          >
            <coneGeometry args={[0.12, 0.35, 5]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.45} />
          </mesh>
        ))}
        {/* Shadow ring */}
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.55, 20]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.3} />
        </mesh>
        {/* Direction pointer */}
        <mesh position={[0, 0.12, 0.62]} rotation={[0.35, 0, 0]}>
          <coneGeometry args={[0.14, 0.35, 4]} />
          <meshStandardMaterial color="#facc15" emissive="#f59e0b" emissiveIntensity={0.25} />
        </mesh>
      </group>
    </group>
  );
}
