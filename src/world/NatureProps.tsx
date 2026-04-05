import { useMemo } from "react";

function Tree({ p, s = 1 }: { p: [number, number, number]; s?: number }) {
  return (
    <group position={p} scale={s}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.22, 0.32, 1.8, 8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 2.4, 0]}>
        <coneGeometry args={[1.1, 1.9, 7]} />
        <meshStandardMaterial color="#16a34a" emissive="#14532d" emissiveIntensity={0.08} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 3.35, 0]}>
        <coneGeometry args={[0.85, 1.5, 7]} />
        <meshStandardMaterial color="#22c55e" roughness={0.75} />
      </mesh>
    </group>
  );
}

function Rock({ p, c = "#78716c" }: { p: [number, number, number]; c?: string }) {
  return (
    <mesh castShadow position={p} rotation={[0.3, 0.9, 0.1]}>
      <dodecahedronGeometry args={[0.55, 0]} />
      <meshStandardMaterial color={c} roughness={0.95} />
    </mesh>
  );
}

export function NatureProps() {
  const trees = useMemo(
    () =>
      [
        [18, 0, -10],
        [-20, 0, 8],
        [24, 0, 18],
        [-12, 0, -18],
        [32, 0, -6],
        [-28, 0, -12],
        [8, 0, 22],
        [-8, 0, 24],
      ] as [number, number, number][],
    []
  );

  return (
    <group>
      {trees.map((t, i) => (
        <Tree key={i} p={t} s={0.85 + (i % 3) * 0.12} />
      ))}
      <Rock p={[14, 0, -4]} />
      <Rock p={[-16, 0, 4]} c="#57534e" />
      <Rock p={[22, 0, 12]} c="#44403c" />
      <Rock p={[-22, 0, -8]} />
      <mesh position={[6, 0.2, 18]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <circleGeometry args={[0.7, 12]} />
        <meshStandardMaterial color="#15803d" roughness={0.9} />
      </mesh>
      <mesh position={[-10, 0.2, -16]} rotation={[-Math.PI / 2, 0, -0.2]}>
        <circleGeometry args={[0.55, 12]} />
        <meshStandardMaterial color="#22c55e" roughness={0.9} />
      </mesh>
    </group>
  );
}
