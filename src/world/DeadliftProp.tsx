import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../game/store";
import { SEG } from "../config/quality";

export function DeadliftProp({ stationId }: { stationId: string }) {
  const barRef = useRef<THREE.Group>(null);
  const t = useRef(0);
  const active = useGameStore(
    (s) => s.trainingStationId === stationId && s.trainingStationId !== null
  );

  useFrame((_, dt) => {
    t.current += dt;
    const g = barRef.current;
    if (g) {
      const bounce = active ? Math.sin(t.current * 18) * 0.14 : Math.sin(t.current * 2) * 0.02;
      g.position.y = 1.15 + bounce;
    }
  });

  return (
    <group>
      <RoundedBox args={[3.8, 0.2, 2.6]} radius={0.04} smoothness={3} receiveShadow position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#1a2030" roughness={0.82} />
      </RoundedBox>
      <mesh receiveShadow position={[0, 0.11, 0]}>
        <boxGeometry args={[3.4, 0.02, 2.2]} />
        <meshStandardMaterial color="#c06878" emissive="#a03050" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[-1.15, 0.85, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.22, SEG.cyl]} />
        <meshStandardMaterial color="#303848" metalness={0.6} roughness={0.32} />
      </mesh>
      <mesh position={[1.15, 0.85, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.22, SEG.cyl]} />
        <meshStandardMaterial color="#303848" metalness={0.6} roughness={0.32} />
      </mesh>
      <group ref={barRef} position={[0, 1.15, 0]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 3.2, SEG.cyl]} />
          <meshStandardMaterial color="#c0c8d0" metalness={0.85} roughness={0.18} />
        </mesh>
      </group>
      <mesh position={[-1.55, 0.55, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.9, SEG.cyl]} />
        <meshStandardMaterial color="#5a6068" roughness={0.45} metalness={0.3} />
      </mesh>
      <mesh position={[1.55, 0.55, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.9, SEG.cyl]} />
        <meshStandardMaterial color="#5a6068" roughness={0.45} metalness={0.3} />
      </mesh>
      {active && (
        <group position={[0, 0.35, 0]}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[Math.sin(i) * 0.4, 0, Math.cos(i * 1.2) * 0.35]}>
              <sphereGeometry args={[0.06, SEG.sphere, SEG.sphere]} />
              <meshStandardMaterial color="#e8c870" emissive="#d8a830" emissiveIntensity={0.5} transparent opacity={0.6} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
