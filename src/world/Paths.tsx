import { useMemo } from "react";
import * as THREE from "three";
import { MOUNTAINS } from "../data/mountains";
import { PALETTE } from "../config/palette";

function PathStrip({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const geom = useMemo(() => {
    const mid1 = from.clone().lerp(to, 0.35);
    const mid2 = from.clone().lerp(to, 0.72);
    const curve = new THREE.CatmullRomCurve3([from, mid1, mid2, to]);
    return new THREE.TubeGeometry(curve, 36, 1.1, 12, false);
  }, [from, to]);

  return (
    <mesh geometry={geom}>
      <meshStandardMaterial
        color={PALETTE.path}
        roughness={0.85}
      />
    </mesh>
  );
}

function CenterLine({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const geom = useMemo(() => {
    const mid1 = from.clone().lerp(to, 0.35);
    const mid2 = from.clone().lerp(to, 0.72);
    const curve = new THREE.CatmullRomCurve3([from, mid1, mid2, to]);
    return new THREE.TubeGeometry(curve, 36, 0.12, 8, false);
  }, [from, to]);

  return (
    <mesh geometry={geom} position={[0, 0.06, 0]}>
      <meshStandardMaterial
        color={PALETTE.roadMarking}
        roughness={0.7}
      />
    </mesh>
  );
}

export function Paths() {
  const strips = useMemo(
    () =>
      MOUNTAINS.map((m) => ({
        id: m.id,
        from: new THREE.Vector3(0, 0, 0),
        to: new THREE.Vector3(m.position[0], 0, m.position[2]),
      })),
    []
  );

  return (
    <group position={[0, 0.08, 0]}>
      {strips.map((s) => (
        <group key={s.id}>
          <PathStrip from={s.from} to={s.to} />
          <CenterLine from={s.from} to={s.to} />
        </group>
      ))}
    </group>
  );
}
