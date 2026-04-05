import { PALETTE } from "../config/palette";
import { WATER_ZONE } from "../data/gymEquipment";

export function TerrainAndZones() {
  return (
    <group>
      {/* Asphalt base */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color={PALETTE.asphalt} roughness={0.92} />
      </mesh>

      {/* Sidewalk ring around gym */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[20, 26, 48]} />
        <meshStandardMaterial color={PALETTE.sidewalk} roughness={0.82} />
      </mesh>

      {/* Curb edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[25.5, 26.2, 48]} />
        <meshStandardMaterial color={PALETTE.curb} roughness={0.75} />
      </mesh>

      {/* Earthy outer zone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[26, 55, 64]} />
        <meshStandardMaterial
          color={PALETTE.grassDark}
          transparent
          opacity={0.35}
          roughness={1}
        />
      </mesh>

      {/* Water channel */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[WATER_ZONE.innerRadius, WATER_ZONE.outerRadius, 64]} />
        <meshStandardMaterial
          color={PALETTE.water}
          transparent
          opacity={0.4}
          roughness={0.3}
          metalness={0.08}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
        <ringGeometry args={[WATER_ZONE.innerRadius + 2, WATER_ZONE.outerRadius - 2, 64]} />
        <meshStandardMaterial
          color={PALETTE.waterLight}
          transparent
          opacity={0.12}
          roughness={0.2}
        />
      </mesh>

      {/* Road markings — crosswalk-style dashes near gym */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={`cw${i}`} receiveShadow position={[x * 2.5, 0.015, 18]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 3.5]} />
          <meshStandardMaterial color={PALETTE.roadMarking} roughness={0.75} />
        </mesh>
      ))}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={`cw2${i}`} receiveShadow position={[x * 2.5, 0.015, -18]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 3.5]} />
          <meshStandardMaterial color={PALETTE.roadMarking} roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
}
