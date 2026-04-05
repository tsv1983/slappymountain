import { useMemo } from "react";
import { PALETTE } from "../config/palette";
import { SEG } from "../config/quality";

const P = PALETTE;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function CherryTree({ p, s = 1, seed = 0 }: { p: [number, number, number]; s?: number; seed?: number }) {
  const yaw = seededRandom(seed) * Math.PI * 2;
  return (
    <group position={p} scale={s} rotation={[0, yaw, 0]}>
      <mesh castShadow position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.16, 0.28, 2.0, SEG.cyl]} />
        <meshStandardMaterial color={P.wood} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[-0.15, 1.8, 0.1]}>
        <cylinderGeometry args={[0.06, 0.1, 0.9, 8]} />
        <meshStandardMaterial color={P.wood} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 2.6, 0]}>
        <sphereGeometry args={[1.4, SEG.sphere, SEG.sphere]} />
        <meshStandardMaterial color={P.cherry} roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0.5, 3.1, 0.35]}>
        <sphereGeometry args={[0.95, SEG.sphere, SEG.sphere]} />
        <meshStandardMaterial color={P.cherryDeep} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[-0.55, 2.45, -0.25]}>
        <sphereGeometry args={[0.85, SEG.sphere, SEG.sphere]} />
        <meshStandardMaterial color={P.cherry} roughness={0.74} />
      </mesh>
      <mesh castShadow position={[0.2, 3.4, -0.4]}>
        <sphereGeometry args={[0.6, SEG.sphere, SEG.sphere]} />
        <meshStandardMaterial color={P.cherryDeep} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.3, SEG.circle]} />
        <meshBasicMaterial color="#2a2420" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function EvergreenTree({ p, s = 1, seed = 0 }: { p: [number, number, number]; s?: number; seed?: number }) {
  const yaw = seededRandom(seed + 100) * Math.PI * 2;
  return (
    <group position={p} scale={s} rotation={[0, yaw, 0]}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.18, 0.26, 1.8, SEG.cyl]} />
        <meshStandardMaterial color={P.woodDark} roughness={0.88} />
      </mesh>
      <mesh castShadow position={[0, 2.4, 0]}>
        <coneGeometry args={[1.05, 1.9, SEG.cone]} />
        <meshStandardMaterial color={P.leafDark} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 3.3, 0]}>
        <coneGeometry args={[0.78, 1.5, SEG.cone]} />
        <meshStandardMaterial color={P.leaf} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, SEG.circle]} />
        <meshBasicMaterial color="#2a2420" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Rock({ p, c, seed = 0 }: { p: [number, number, number]; c?: string; seed?: number }) {
  const yaw = seededRandom(seed + 200) * Math.PI * 2;
  const sc = 0.85 + seededRandom(seed + 300) * 0.3;
  return (
    <mesh castShadow position={p} rotation={[0.3, yaw, 0.1]} scale={sc}>
      <dodecahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial color={c ?? P.curb} roughness={0.9} />
    </mesh>
  );
}

export function NatureProps() {
  const cherries = useMemo<[number, number, number][]>(
    () => [
      [18, 0, -10], [-20, 0, 8], [8, 0, 22], [-8, 0, 24],
      [30, 0, 14], [-24, 0, -16],
    ],
    []
  );
  const evergreens = useMemo<[number, number, number][]>(
    () => [[24, 0, 18], [-12, 0, -18], [32, 0, -6], [-28, 0, -12]],
    []
  );

  return (
    <group>
      {cherries.map((t, i) => (
        <CherryTree key={`ch${i}`} p={t} s={0.88 + seededRandom(i) * 0.24} seed={i} />
      ))}
      {evergreens.map((t, i) => (
        <EvergreenTree key={`ev${i}`} p={t} s={0.82 + seededRandom(i + 50) * 0.2} seed={i} />
      ))}
      <Rock p={[14, 0, -4]} c={P.asphaltLight} seed={1} />
      <Rock p={[-16, 0, 4]} seed={2} />
      <Rock p={[22, 0, 12]} c={P.woodDark} seed={3} />
      <Rock p={[-22, 0, -8]} seed={4} />
      <Rock p={[26, 0, -12]} c={P.curb} seed={5} />
      <Rock p={[-10, 0, 20]} seed={6} />
    </group>
  );
}
