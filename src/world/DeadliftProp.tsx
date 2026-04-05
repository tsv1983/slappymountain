import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../game/store";

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
      <mesh receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[3.8, 0.2, 2.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 0.11, 0]}>
        <boxGeometry args={[3.4, 0.02, 2.2]} />
        <meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[-1.15, 0.85, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.22, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[1.15, 0.85, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.22, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.35} />
      </mesh>
      <group ref={barRef} position={[0, 1.15, 0]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 3.2, 10]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
      <mesh position={[-1.55, 0.55, 0]}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} />
      </mesh>
      <mesh position={[1.55, 0.55, 0]}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} />
      </mesh>
      {active && (
        <group position={[0, 0.35, 0]}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[Math.sin(i) * 0.4, 0, Math.cos(i * 1.2) * 0.35]}>
              <sphereGeometry args={[0.06, 6, 6]} />
              <meshStandardMaterial
                color="#fde68a"
                emissive="#fbbf24"
                emissiveIntensity={0.4}
                transparent
                opacity={0.65}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
