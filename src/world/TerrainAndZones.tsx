import { PALETTE } from "../config/palette";
import { WATER_ZONE } from "../data/gymEquipment";

export function TerrainAndZones() {
  return (
    <group>
      {/* Base grass */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color={PALETTE.grass} roughness={0.95} />
      </mesh>

      {/* Water ring — sits just above grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[WATER_ZONE.innerRadius, WATER_ZONE.outerRadius, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.38}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      {/* Water shimmer overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
        <ringGeometry args={[WATER_ZONE.innerRadius + 2, WATER_ZONE.outerRadius - 2, 64]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.12}
          roughness={0.2}
        />
      </mesh>

      {/* Inner wild zone tint */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[26, WATER_ZONE.innerRadius, 64]} />
        <meshStandardMaterial
          color={PALETTE.wildZone}
          transparent
          opacity={0.22}
          roughness={1}
        />
      </mesh>
    </group>
  );
}
