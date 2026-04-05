import { PALETTE } from "../config/palette";
import { MOUNTAINS } from "../data/mountains";

const P = PALETTE;

export function WorldMarkers() {
  return (
    <group>
      {MOUNTAINS.map((m) => {
        const len = Math.sqrt(m.position[0] ** 2 + m.position[2] ** 2) || 1;
        const nx = (m.position[0] / len) * 13;
        const nz = (m.position[2] / len) * 13;
        return (
          <group key={m.id} position={[nx, 3.5, nz]}>
            {/* Paper lantern marker */}
            <mesh castShadow>
              <cylinderGeometry args={[0.22, 0.28, 0.65, 8]} />
              <meshStandardMaterial
                color={P.lantern}
                emissive={P.lanternGlow}
                emissiveIntensity={0.4}
                roughness={0.45}
              />
            </mesh>
            {/* Top cap */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 6]} />
              <meshStandardMaterial color={P.woodDark} roughness={0.8} />
            </mesh>
            {/* Hanging wire */}
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.35, 4]} />
              <meshStandardMaterial color={P.metal} roughness={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
