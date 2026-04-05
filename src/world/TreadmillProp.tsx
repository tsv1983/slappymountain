import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../game/store";

export function TreadmillProp({ stationId }: { stationId: string }) {
  const beltRef = useRef<THREE.Mesh>(null);
  const active = useGameStore(
    (s) => s.trainingStationId === stationId && s.trainingStationId !== null
  );

  useFrame((_, dt) => {
    const belt = beltRef.current;
    if (!belt) return;
    const speed = active ? 8 : 0;
    belt.position.x = Math.sin(performance.now() * 0.001 * speed) * 0.04;
    belt.rotation.x += (active ? 6 : 0) * dt;
  });

  return (
    <group>
      <mesh receiveShadow position={[0, 0.12, 0]}>
        <boxGeometry args={[3.1, 0.22, 1.35]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[2.55, 0.08, 1.05]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>
      <mesh
        ref={beltRef}
        castShadow
        position={[0, 0.44, 0]}
        rotation={[0.08, 0, 0]}
      >
        <boxGeometry args={[2.35, 0.06, 0.85]} />
        <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[-1.35, 0.55, 0.58]}>
        <boxGeometry args={[0.12, 0.7, 0.08]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[1.35, 0.55, 0.58]}>
        <boxGeometry args={[0.12, 0.7, 0.08]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.05, -0.62]}>
        <boxGeometry args={[0.85, 0.35, 0.22]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.05, -0.62]}>
        <boxGeometry args={[0.55, 0.12, 0.24]} />
        <meshStandardMaterial emissive="#22d3ee" emissiveIntensity={0.35} color="#0891b2" />
      </mesh>
      <mesh position={[0, 0.42, 1.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 2.6, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  );
}
