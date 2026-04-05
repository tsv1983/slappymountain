import { PALETTE } from "../config/palette";

export function TerrainAndZones() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color={PALETTE.grass} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[26, 70, 64]} />
        <meshStandardMaterial
          color={PALETTE.wildZone}
          transparent
          opacity={0.22}
          roughness={1}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[70, 120, 64]} />
        <meshStandardMaterial
          color="#34d399"
          transparent
          opacity={0.12}
          roughness={1}
        />
      </mesh>
    </group>
  );
}
