import { useMemo } from "react";
import { PALETTE } from "../config/palette";

const P = PALETTE;

function CherryTree({ p, s = 1 }: { p: [number, number, number]; s?: number }) {
  return (
    <group position={p} scale={s}>
      {/* Trunk */}
      <mesh castShadow position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.18, 0.3, 2.0, 7]} />
        <meshStandardMaterial color={P.wood} roughness={0.88} />
      </mesh>
      {/* Main canopy — cherry blossom pink */}
      <mesh castShadow position={[0, 2.6, 0]}>
        <sphereGeometry args={[1.4, 8, 7]} />
        <meshStandardMaterial color={P.cherry} roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0.4, 3.0, 0.3]}>
        <sphereGeometry args={[0.9, 7, 6]} />
        <meshStandardMaterial color={P.cherryDeep} roughness={0.72} />
      </mesh>
      <mesh castShadow position={[-0.5, 2.4, -0.2]}>
        <sphereGeometry args={[0.8, 7, 6]} />
        <meshStandardMaterial color={P.cherry} roughness={0.78} />
      </mesh>
      {/* Shadow blob */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 12]} />
        <meshBasicMaterial color="#2a2420" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function EvergreenTree({ p, s = 1 }: { p: [number, number, number]; s?: number }) {
  return (
    <group position={p} scale={s}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 1.8, 7]} />
        <meshStandardMaterial color={P.woodDark} roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 2.4, 0]}>
        <coneGeometry args={[1.0, 1.8, 7]} />
        <meshStandardMaterial color={P.leafDark} roughness={0.82} />
      </mesh>
      <mesh castShadow position={[0, 3.2, 0]}>
        <coneGeometry args={[0.75, 1.4, 7]} />
        <meshStandardMaterial color={P.leaf} roughness={0.78} />
      </mesh>
    </group>
  );
}

function Rock({ p, c }: { p: [number, number, number]; c?: string }) {
  return (
    <mesh castShadow position={p} rotation={[0.3, 0.9, 0.1]}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={c ?? P.curb} roughness={0.92} />
    </mesh>
  );
}

export function NatureProps() {
  const cherries = useMemo<[number, number, number][]>(
    () => [
      [18, 0, -10],
      [-20, 0, 8],
      [8, 0, 22],
      [-8, 0, 24],
      [30, 0, 14],
      [-24, 0, -16],
    ],
    []
  );
  const evergreens = useMemo<[number, number, number][]>(
    () => [
      [24, 0, 18],
      [-12, 0, -18],
      [32, 0, -6],
      [-28, 0, -12],
    ],
    []
  );

  return (
    <group>
      {cherries.map((t, i) => (
        <CherryTree key={`ch${i}`} p={t} s={0.9 + (i % 3) * 0.1} />
      ))}
      {evergreens.map((t, i) => (
        <EvergreenTree key={`ev${i}`} p={t} s={0.85 + (i % 3) * 0.12} />
      ))}
      <Rock p={[14, 0, -4]} c={P.asphaltLight} />
      <Rock p={[-16, 0, 4]} />
      <Rock p={[22, 0, 12]} c={P.woodDark} />
      <Rock p={[-22, 0, -8]} />
    </group>
  );
}
