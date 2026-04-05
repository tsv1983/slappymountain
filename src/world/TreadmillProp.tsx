import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../game/store";
import { SEG } from "../config/quality";

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
      <RoundedBox args={[3.1, 0.22, 1.35]} radius={0.04} smoothness={3} receiveShadow position={[0, 0.12, 0]}>
        <meshStandardMaterial color="#8a9098" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[2.55, 0.08, 1.05]} />
        <meshStandardMaterial color="#b8c0c8" roughness={0.45} />
      </mesh>
      <mesh ref={beltRef} castShadow position={[0, 0.44, 0]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[2.35, 0.06, 0.85]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.32} metalness={0.15} />
      </mesh>
      <mesh position={[-1.35, 0.55, 0.58]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, SEG.cyl]} />
        <meshStandardMaterial color="#d0d4d8" metalness={0.45} roughness={0.3} />
      </mesh>
      <mesh position={[1.35, 0.55, 0.58]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, SEG.cyl]} />
        <meshStandardMaterial color="#d0d4d8" metalness={0.45} roughness={0.3} />
      </mesh>
      <RoundedBox args={[0.85, 0.35, 0.22]} radius={0.04} smoothness={3} position={[0, 1.05, -0.62]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 1.05, -0.62]}>
        <boxGeometry args={[0.55, 0.12, 0.24]} />
        <meshStandardMaterial emissive="#22c8d8" emissiveIntensity={0.45} color="#0a8890" />
      </mesh>
      <mesh position={[0, 0.42, 1.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 2.6, SEG.cyl]} />
        <meshStandardMaterial color="#5a6068" metalness={0.55} roughness={0.3} />
      </mesh>
    </group>
  );
}
