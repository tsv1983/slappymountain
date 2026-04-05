import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getPetById } from "../data/pets";
import { useGameStore } from "../game/store";

export function CompanionPet({
  playerPos,
  playerYaw,
}: {
  playerPos: React.MutableRefObject<THREE.Vector3>;
  playerYaw: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null);
  const equippedPetId = useGameStore((s) => s.equippedPetId);
  const pet = useMemo(() => getPetById(equippedPetId), [equippedPetId]);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g || !pet) {
      if (g) g.visible = false;
      return;
    }
    g.visible = true;
    const off = new THREE.Vector3(1.2, 0, 1.5);
    off.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerYaw.current);
    const target = playerPos.current.clone().add(off);
    g.position.lerp(target, 1 - Math.exp(-5 * dt));
    g.position.y = 0.45 + Math.sin(performance.now() * 0.004) * 0.06;
    g.lookAt(playerPos.current.x, playerPos.current.y + 0.8, playerPos.current.z);
  });

  if (!pet) return null;

  const color =
    pet.rarity === "mythic" ? "#fb7185" : pet.rarity === "rare" ? "#a78bfa" : "#4ade80";

  return (
    <group ref={ref}>
      <mesh castShadow>
        <sphereGeometry args={[0.32, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.35} emissive={color} emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0.22, 0.12, 0.12]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.22, 0.12, 0.12]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}
